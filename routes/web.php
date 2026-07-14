<?php

use Illuminate\Support\Facades\Route;
use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\Psr7\MultipartStream;
use GuzzleHttp\Psr7\Utils;

Route::get('/', function () {
    return view('welcome');
});

// Proxy all /api/* requests to the backend service.
Route::any('/api/{any}', function ($any) {
    $request  = request();
    $backendUrl = rtrim(config('services.backend.url'), '/') . '/api/' . $any;
    $queryString = $request->query() ? '?' . http_build_query($request->query()) : '';

    // Auth & Accept headers only (Content-Type set by Guzzle for multipart)
    $baseHeaders = array_filter([
        'Authorization' => $request->header('Authorization'),
        'Accept'        => $request->header('Accept', 'application/json'),
    ]);

    try {
        $guzzle = new GuzzleClient(['connect_timeout' => 5, 'timeout' => 30]);

        $contentType = $request->header('Content-Type', '');
        $isMultipart = str_contains($contentType, 'multipart/form-data');

        if ($isMultipart) {
            // Rebuild multipart from parsed PHP data (PHP already parsed it)
            $parts = [];

            // Flatten all form fields recursively
            $flattenFields = function ($fields, $prefix = '') use (&$flattenFields, &$parts) {
                foreach ($fields as $key => $value) {
                    $fieldName = $prefix ? "{$prefix}[{$key}]" : $key;
                    if (is_array($value)) {
                        $flattenFields($value, $fieldName);
                    } else {
                        $parts[] = [
                            'name'     => $fieldName,
                            'contents' => (string) $value,
                        ];
                    }
                }
            };

            $flattenFields($request->except(['_token']));

            // Add uploaded files
            foreach ($request->allFiles() as $fieldName => $fileOrFiles) {
                $files = is_array($fileOrFiles) ? $fileOrFiles : [$fileOrFiles];
                foreach ($files as $file) {
                    $parts[] = [
                        'name'     => $fieldName . '[]',
                        'contents' => Utils::tryFopen($file->getRealPath(), 'r'),
                        'filename' => $file->getClientOriginalName(),
                        'headers'  => ['Content-Type' => $file->getMimeType()],
                    ];
                }
            }

            $multipartStream = new MultipartStream($parts);
            $boundary        = $multipartStream->getBoundary();

            $guzzleResponse = $guzzle->request(
                'POST',   // Always POST; _method field handles spoofing on backend
                $backendUrl . $queryString,
                [
                    'headers' => array_merge($baseHeaders, [
                        'Content-Type' => "multipart/form-data; boundary={$boundary}",
                    ]),
                    'body' => $multipartStream,
                ]
            );
        } else {
            // Forward JSON / plain body as-is
            $extraHeaders = [];
            if ($ct = $request->header('Content-Type')) {
                $extraHeaders['Content-Type'] = $ct;
            }

            $guzzleResponse = $guzzle->request(
                $request->method(),
                $backendUrl . $queryString,
                [
                    'headers' => array_merge($baseHeaders, $extraHeaders),
                    'body'    => $request->getContent(),
                ]
            );
        }

        return response(
            $guzzleResponse->getBody()->getContents(),
            $guzzleResponse->getStatusCode()
        )->withHeaders(array_filter([
            'Content-Type'        => $guzzleResponse->getHeaderLine('Content-Type'),
            'Cache-Control'       => $guzzleResponse->getHeaderLine('Cache-Control'),
            'Content-Disposition' => $guzzleResponse->getHeaderLine('Content-Disposition'),
        ]));

    } catch (\GuzzleHttp\Exception\ConnectException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Backend service is temporarily unavailable.',
        ], 502);
    } catch (\GuzzleHttp\Exception\RequestException $e) {
        if ($e->hasResponse()) {
            $resp = $e->getResponse();
            return response(
                $resp->getBody()->getContents(),
                $resp->getStatusCode()
            )->withHeaders(array_filter([
                'Content-Type' => $resp->getHeaderLine('Content-Type'),
            ]));
        }
        return response()->json([
            'success' => false,
            'message' => 'Proxy error: ' . $e->getMessage(),
        ], 500);
    }
})->where('any', '.*');

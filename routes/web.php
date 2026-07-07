<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

Route::get('/', function () {
    return view('welcome');
});

// Proxy API requests to the backend server (port 8000)
Route::any('/api/{any}', function ($any) {
    $backendUrl = env('BACKEND_URL', 'http://127.0.0.1:8000');
    
    // Proxy the request including headers, method, body, and query parameters
    $response = Http::withHeaders(request()->headers->all())
        ->send(request()->method(), $backendUrl . '/api/' . $any, [
            'body' => request()->getContent(),
            'query' => request()->query()
        ]);
        
    return response($response->body(), $response->status())
        ->withHeaders($response->headers());
})->where('any', '.*');

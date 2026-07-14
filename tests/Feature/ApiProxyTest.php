<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ApiProxyTest extends TestCase
{
    public function test_it_forwards_api_requests_to_the_configured_backend(): void
    {
        config()->set('services.backend.url', 'http://backend.test');

        Http::fake([
            'backend.test/api/v1/health' => Http::response([
                'status' => 'ok',
            ]),
        ]);

        $response = $this->getJson('/api/v1/health');

        $response->assertOk()->assertJson(['status' => 'ok']);
        Http::assertSent(fn ($request) => $request->url() === 'http://backend.test/api/v1/health');
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;


class GzipMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        Log::info("GzipMiddleware called START" . $request->url());
        $response = $next($request);
        $content = $response->content();
        $data = gzencode($content, 5);
        Log::info("GzipMiddleware content encoded". $request->url());
        return response($data)->withHeaders([
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods'=> 'GET',
            'Content-type' => 'application/json; charset=utf-8',
            'Content-Length'=> strlen($data),
            'Content-Encoding' => 'gzip'
        ]);
    }
}

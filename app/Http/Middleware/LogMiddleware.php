<?php
//
//namespace App\Http\Middleware;
//
//use Closure;
//use Illuminate\Foundation\Http\Kernel as HttpKernel;
//use Illuminate\Http\Request;
//
///**
// *  namespace App\Http;
//    use Illuminate\Foundation\Http\Kernel as HttpKernel;
//    aggiungere nella class Kernel extends HttpKernel l'instanziazione
// */
//final class LogMiddleware
//{
//    private Logger $logger;
//
//    public function __construct(
//        Logger $logger,
//    ) {
//        $this->logger = $logger;
//    }
//    public function handle(Request $request, Closure $next)
//    {
//        $response = $next($request);
//
//        $this->logger->info('Dump request', [
//            'request' => serialize($request),
//            'response' => serialize($response),
//        ]);
//
//        return $response;
//    }
//}

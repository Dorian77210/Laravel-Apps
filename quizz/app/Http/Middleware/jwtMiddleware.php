<?php
namespace App\Http\Middleware;

use Namshi\JOSE\SimpleJWS;

use Closure;
use JWTAuth;
use Exception;
class jwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if( !$request->session()->has( 'user' ) ) {
            return response()->json( ['hasError' => true ] );
        }

        return $next($request);
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckRole
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
        $roles=array_slice(func_get_args(),2);
        if (Auth::user()->hasRoles($roles)) {
            return $next($request);
        }
        return response()->json([
            'status'=>'error',
            'message'=>'No tienes permisos para realizar esta acción',
        ],401);
    }
}

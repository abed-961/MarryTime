<?php

namespace App\Http\Middleware;

use App\DTO\Response as DTOResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$role): Response
    {
        $user = $request->user();
        if (!in_array($user->role, $role)) {
            return DTOResponse::failure('Unauthanticated', 401);
        }

        return $next($request);
    }
}

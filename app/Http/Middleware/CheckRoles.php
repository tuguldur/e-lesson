<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
class CheckRoles
{
    public function handle($request, Closure $next, ... $roles)
    {
        if(!Auth::check()){
            return response()->json(['status' => false, 'msg' => 'Хандах эрхгүй'], 403);
        }
        $user = Auth::user();

        foreach($roles as $role) {
            if($user->role === $role)
                return $next($request);
        }
        return response()->json(['status' => false, 'msg' => 'Хандах эрхгүй'], 403);
    }
}
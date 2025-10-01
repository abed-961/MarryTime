<?php

namespace App\Http\Controllers;

use App\DTO\Response;
use App\Http\Requests\loginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();
        $user = User::create($validated);
        Auth::login($user);
        $user->createToken('user-token')->plainTextToken;
        return Response::success('user created succefully');
    }


    public function login(loginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return Response::failure('Email or password is incorrect');
        }


        $user = Auth::user();
        // Create API token
        $user->createToken('user-token')->plainTextToken;

        return Response::success('Logged in successfully');
    }

    public function logout(Request $request)
    {
        // Ensure the user is authenticated
        $user = $request->user();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        if (!$user) {
            return Response::failure('User not authenticated');
        }

        // Delete all tokens for this user (logout from all devices)
        $user->tokens()->delete();

        return Response::success('Logged out successfully');
    }

}


<?php

namespace App\Http\Controllers;

use App\Http\DTO\Response;
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



        // Create API token
        $request->user()->createToken('user-token');

        return Response::success(' Logged in successfully');
    }

}


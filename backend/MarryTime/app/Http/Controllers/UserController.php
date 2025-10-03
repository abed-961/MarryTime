<?php

namespace App\Http\Controllers;

use App\DTO\Response;
use App\Http\Requests\loginRequest;
use App\Http\Requests\PatchUserRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

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

    public function userDashboardDetails(Request $request)
    {
        $user = $request->user()->load([
            'vendor.services.category',
            'vendor.availabilities',
        ]);

        return $user;
    }


    public function editUser(PatchUserRequest $request)
    {   /** @var Request $req */
        $req = $request;
        $data = $req->validated();
        $user = $req->user();

        $user->fill($data);

        // Handle password
        if (isset($data['new_password'])) {
            $user->password = $data['new_password'];
        }

        // Handle photo upload
        if ($req->hasFile('photo')) {
            $photo = $req->file('photo');
            $photo_name = time() . $photo->getClientOriginalName();
            $user->photo = $photo_name;
            $photo->storeAs('photos', $photo_name, 'public');
        }

        $user->save();
        return Response::success('user edited succefully');
    }
}


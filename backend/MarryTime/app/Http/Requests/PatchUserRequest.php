<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class PatchUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:20' ],
            'current_password' => ['sometimes', 'required_with:new_password', 'current_password'], // check old password
            'new_password' => [
                'sometimes',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->letters()
                    ->uncompromised()

            ], // expects new_password + new_password_confirmation
            'photo' => ['sometimes', 'image', 'max:2048'], // jpg, png, max 2MB
            'role' => ['sometimes', 'in:vendor,client'],
        ];
    }
}

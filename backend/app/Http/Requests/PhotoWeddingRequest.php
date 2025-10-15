<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PhotoWeddingRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule]array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'caption' => ['required', 'min:10', 'string'],
            'photo' => [
                'required',
                'image',
                'mimes:jpeg,jpg,png,gif,webp',
                'max:2048'
            ]
        ];
    }
}

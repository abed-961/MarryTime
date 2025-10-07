<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class appointmentCreateRequest extends FormRequest
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
            [
                'vendor_id' => 'required|exists:vendors,id',
                'category_id' => 'required|exists:categories,id',
                'appointment_date' => 'required|date',
                'location' => 'required|string',
                'guests' => 'required|integer|min:1',
                'tables' => 'required|integer|min:1',
                'notes' => 'nullable|string',
            ]
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCakeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'weight' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'emails' => 'nullable|array',
            'emails.*' => 'email'
        ];
    }
}


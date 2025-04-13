<?php

namespace Database\Factories;

use App\Models\InterestedEmail;
use Illuminate\Database\Eloquent\Factories\Factory;

class InterestedEmailFactory extends Factory
{
    protected $model = InterestedEmail::class;

    public function definition(): array
    {
        return [
            'email' => $this->faker->safeEmail(),
            'cake_id' => \App\Models\Cake::factory(),
        ];
    }
}

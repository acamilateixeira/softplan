<?php

namespace Database\Factories;

use App\Models\Cake;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as FakerFactory;

class CakeFactory extends Factory
{
    protected $model = Cake::class;

    public function definition(): array
    {
        $faker = FakerFactory::create('pt_BR');

        return [
            'name' => ucfirst($faker->word) . ' Cake',
            'weight' => $faker->numberBetween(500, 2000),
            'price' => $faker->randomFloat(2, 10, 100),
            'quantity' => $faker->numberBetween(1, 10),
        ];
    }
}

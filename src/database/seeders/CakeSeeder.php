<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cake;
use App\Models\InterestedEmail;

class CakeSeeder extends Seeder
{
    public function run(): void
    {
        Cake::factory(5)->create()->each(function ($cake) {
            InterestedEmail::factory()->count(rand(1, 3))->create([
                'cake_id' => $cake->id,
            ]);
        });
    }
}

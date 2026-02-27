<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DriverFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'         => fake()->name(),
            'cpf'          => fake()->unique()->numerify('###.###.###-##'),
            'cnh_number'   => fake()->unique()->bothify('CNH#####'),
            'cnh_category' => fake()->randomElement(['A', 'B', 'C', 'D', 'E']),
            'phone'        => fake()->phoneNumber(),
            'is_active'    => true,
        ];
    }
}
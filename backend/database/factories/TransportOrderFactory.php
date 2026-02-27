<?php
namespace Database\Factories;

use App\Models\Driver;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransportOrderFactory extends Factory
{
    public function definition(): array
    {
        static $counter = 0;
        $counter++;

        return [
            'order_number'        => sprintf('OC-%05d', $counter),
            'driver_id'           => Driver::factory(),
            'origin_address'      => fake()->address(),
            'destination_address' => fake()->address(),
            'cargo_description'   => fake()->sentence(),
            'weight_kg'           => fake()->randomFloat(2, 10, 5000),
            'status'              => 'pending',
            'scheduled_date'      => fake()->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            'notes'               => fake()->optional()->sentence(),
        ];
    }
}
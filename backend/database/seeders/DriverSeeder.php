<?php
namespace Database\Seeders;

use App\Models\Driver;
use Illuminate\Database\Seeder;

class DriverSeeder extends Seeder
{
    public function run(): void
    {
        $drivers = [
            ['name' => 'Carlos Silva',   'cpf' => '123.456.789-00', 'cnh_number' => 'CNH00001', 'cnh_category' => 'E', 'phone' => '(11) 91111-1111'],
            ['name' => 'Ana Souza',      'cpf' => '234.567.890-11', 'cnh_number' => 'CNH00002', 'cnh_category' => 'D', 'phone' => '(11) 92222-2222'],
            ['name' => 'Roberto Lima',   'cpf' => '345.678.901-22', 'cnh_number' => 'CNH00003', 'cnh_category' => 'C', 'phone' => '(11) 93333-3333'],
            ['name' => 'Fernanda Costa', 'cpf' => '456.789.012-33', 'cnh_number' => 'CNH00004', 'cnh_category' => 'B', 'phone' => '(11) 94444-4444'],
            ['name' => 'Marcos Oliveira','cpf' => '567.890.123-44', 'cnh_number' => 'CNH00005', 'cnh_category' => 'E', 'phone' => '(11) 95555-5555'],
        ];

        foreach ($drivers as $driver) {
            Driver::create($driver);
        }
    }
}
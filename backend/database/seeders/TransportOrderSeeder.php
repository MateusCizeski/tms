<?php
namespace Database\Seeders;

use App\Models\TransportOrder;
use Illuminate\Database\Seeder;

class TransportOrderSeeder extends Seeder
{
    public function run(): void
    {
        $orders = [
            ['driver_id' => 1, 'origin_address' => 'Av. Paulista, 1000 - São Paulo/SP',    'destination_address' => 'Rua das Flores, 200 - Campinas/SP',     'cargo_description' => 'Equipamentos eletrônicos',  'weight_kg' => 350.00,  'status' => 'pending',    'scheduled_date' => '2025-02-01', 'notes' => null],
            ['driver_id' => 2, 'origin_address' => 'Rua Augusta, 500 - São Paulo/SP',       'destination_address' => 'Av. Brasil, 900 - Rio de Janeiro/RJ',    'cargo_description' => 'Móveis e utensílios',       'weight_kg' => 800.50,  'status' => 'collecting', 'scheduled_date' => '2025-02-02', 'notes' => 'Cuidado com objetos frágeis'],
            ['driver_id' => 3, 'origin_address' => 'Rodovia BR-116, Km 10 - Curitiba/PR',  'destination_address' => 'Av. Sete de Setembro, 300 - Curitiba/PR','cargo_description' => 'Produtos alimentícios',    'weight_kg' => 1200.00, 'status' => 'collected',  'scheduled_date' => '2025-02-03', 'notes' => null],
            ['driver_id' => 4, 'origin_address' => 'Rua da Consolação, 700 - São Paulo/SP','destination_address' => 'Av. Getúlio Vargas, 100 - BH/MG',        'cargo_description' => 'Peças automotivas',         'weight_kg' => 600.75,  'status' => 'delivering', 'scheduled_date' => '2025-02-04', 'notes' => null],
            ['driver_id' => 5, 'origin_address' => 'Av. Atlântica, 1500 - Rio de Janeiro', 'destination_address' => 'Rua XV de Novembro, 50 - Florianópolis', 'cargo_description' => 'Materiais de construção',  'weight_kg' => 2000.00, 'status' => 'delivered',  'scheduled_date' => '2025-02-05', 'notes' => 'Entrega concluída'],
            ['driver_id' => 1, 'origin_address' => 'Av. Ipiranga, 200 - São Paulo/SP',     'destination_address' => 'Rua Coberta, 10 - Porto Alegre/RS',      'cargo_description' => 'Vestuário e tecidos',       'weight_kg' => 150.00,  'status' => 'pending',    'scheduled_date' => '2025-02-06', 'notes' => null],
            ['driver_id' => 2, 'origin_address' => 'Rua Oscar Freire, 300 - São Paulo/SP', 'destination_address' => 'Av. Beira Mar, 400 - Fortaleza/CE',      'cargo_description' => 'Produtos químicos',         'weight_kg' => 500.00,  'status' => 'collecting', 'scheduled_date' => '2025-02-07', 'notes' => 'Produto inflamável'],
            ['driver_id' => 3, 'origin_address' => 'Rodovia BR-376, Km 5 - Londrina/PR',  'destination_address' => 'Av. Mauá, 600 - Joinville/SC',           'cargo_description' => 'Equipamentos industriais', 'weight_kg' => 3000.00, 'status' => 'pending',    'scheduled_date' => '2025-02-08', 'notes' => null],
            ['driver_id' => 4, 'origin_address' => 'Rua Haddock Lobo, 100 - São Paulo/SP','destination_address' => 'Av. Raja Gabaglia, 200 - BH/MG',         'cargo_description' => 'Medicamentos',              'weight_kg' => 80.00,   'status' => 'delivered',  'scheduled_date' => '2025-02-09', 'notes' => 'Temperatura controlada'],
            ['driver_id' => 5, 'origin_address' => 'Av. do Contorno, 900 - BH/MG',        'destination_address' => 'Rua da Bahia, 1200 - BH/MG',             'cargo_description' => 'Bebidas e alimentos',       'weight_kg' => 700.00,  'status' => 'pending',    'scheduled_date' => '2025-02-10', 'notes' => null],
        ];

        foreach ($orders as $index => $order) {
            TransportOrder::create(array_merge($order, [
                'order_number' => sprintf('OC-%05d', $index + 1),
            ]));
        }
    }
}
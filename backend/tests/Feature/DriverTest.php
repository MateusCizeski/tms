<?php
namespace Tests\Feature;

use App\Models\Driver;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DriverTest extends TestCase
{
    use RefreshDatabase;

    private function actingAsUser(): self
    {
        $user = User::factory()->create();
        return $this->actingAs($user, 'sanctum');
    }

    private function driverData(array $overrides = []): array
    {
        return array_merge([
            'name'         => 'Carlos Silva',
            'cpf'          => '123.456.789-00',
            'cnh_number'   => 'CNH00001',
            'cnh_category' => 'E',
            'phone'        => '(11) 91111-1111',
        ], $overrides);
    }

    public function test_can_list_drivers(): void
    {
        Driver::factory()->count(3)->create();

        $this->actingAsUser()
             ->getJson('/api/v1/drivers')
             ->assertStatus(200)
             ->assertJsonCount(3);
    }

    public function test_can_create_driver(): void
    {
        $this->actingAsUser()
             ->postJson('/api/v1/drivers', $this->driverData())
             ->assertStatus(201)
             ->assertJsonFragment(['name' => 'Carlos Silva']);

        $this->assertDatabaseHas('drivers', ['cpf' => '123.456.789-00']);
    }

    public function test_cannot_create_driver_with_duplicate_cpf(): void
    {
        Driver::factory()->create(['cpf' => '123.456.789-00']);

        $this->actingAsUser()
             ->postJson('/api/v1/drivers', $this->driverData())
             ->assertStatus(422)
             ->assertJsonValidationErrors(['cpf']);
    }

    public function test_cannot_create_driver_with_duplicate_cnh(): void
    {
        Driver::factory()->create(['cnh_number' => 'CNH00001']);

        $this->actingAsUser()
             ->postJson('/api/v1/drivers', $this->driverData())
             ->assertStatus(422)
             ->assertJsonValidationErrors(['cnh_number']);
    }

    public function test_cannot_create_driver_with_missing_fields(): void
    {
        $this->actingAsUser()
             ->postJson('/api/v1/drivers', [])
             ->assertStatus(422)
             ->assertJsonValidationErrors(['name', 'cpf', 'cnh_number', 'cnh_category']);
    }

    public function test_can_update_driver(): void
    {
        $driver = Driver::factory()->create();

        $this->actingAsUser()
             ->putJson("/api/v1/drivers/{$driver->id}", ['name' => 'Novo Nome'])
             ->assertStatus(200)
             ->assertJsonFragment(['name' => 'Novo Nome']);

        $this->assertDatabaseHas('drivers', ['id' => $driver->id, 'name' => 'Novo Nome']);
    }

    public function test_can_toggle_driver_active_status(): void
    {
        $driver = Driver::factory()->create(['is_active' => true]);

        $this->actingAsUser()
             ->patchJson("/api/v1/drivers/{$driver->id}/toggle-active")
             ->assertStatus(200)
             ->assertJsonFragment(['is_active' => false]);

        $this->assertDatabaseHas('drivers', ['id' => $driver->id, 'is_active' => false]);
    }
}
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transport_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number', 20)->unique();
            $table->foreignId('driver_id')->constrained('drivers')->restrictOnDelete();
            $table->string('origin_address', 255);
            $table->string('destination_address', 255);
            $table->text('cargo_description');
            $table->decimal('weight_kg', 10, 2)->nullable();
            $table->enum('status', ['pending', 'collecting', 'collected', 'delivering', 'delivered'])
                  ->default('pending');
            $table->date('scheduled_date');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transport_orders');
    }
};

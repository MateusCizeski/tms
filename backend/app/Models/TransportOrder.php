<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransportOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'driver_id',
        'origin_address',
        'destination_address',
        'cargo_description',
        'weight_kg',
        'status',
        'scheduled_date',
        'notes',
    ];

    protected $casts = [
        'scheduled_date' => 'date',
        'weight_kg'      => 'float',
    ];

    public static array $statusFlow = [
        'pending'    => 'collecting',
        'collecting' => 'collected',
        'collected'  => 'delivering',
        'delivering' => 'delivered',
    ];

    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }

    public function nextStatus(): ?string
    {
        return self::$statusFlow[$this->status] ?? null;
    }
}
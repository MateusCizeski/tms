<?php
namespace App\Http\Controllers;

use App\Models\TransportOrder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransportOrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = TransportOrder::with('driver')->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('driver_id')) {
            $query->where('driver_id', $request->driver_id);
        }

        $orders = $query->paginate(perPage: 15);
        return response()->json($orders);
    }

    public function dashboard(): JsonResponse
    {
        $totals = [
            'total'       => TransportOrder::count(),
            'pending'     => TransportOrder::where('status', 'pending')->count(),
            'in_progress' => TransportOrder::whereIn('status', ['collecting', 'collected', 'delivering'])->count(),
            'delivered'   => TransportOrder::where('status', 'delivered')->count(),
        ];

        $latest = TransportOrder::with('driver')
            ->latest()
            ->limit(10)
            ->get();

        return response()->json(compact('totals', 'latest'));
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'driver_id'           => 'required|exists:drivers,id',
            'origin_address'      => 'required|string|max:255',
            'destination_address' => 'required|string|max:255',
            'cargo_description'   => 'required|string',
            'weight_kg'           => 'nullable|numeric|min:0',
            'scheduled_date'      => 'required|date',
            'notes'               => 'nullable|string',
        ]);

        $validated['order_number'] = $this->generateOrderNumber();

        $order = TransportOrder::create($validated);
        $order->load('driver');

        return response()->json($order, 201);
    }

    public function update(Request $request, TransportOrder $transportOrder): JsonResponse
    {
        $validated = $request->validate([
            'driver_id'           => 'sometimes|required|exists:drivers,id',
            'origin_address'      => 'sometimes|required|string|max:255',
            'destination_address' => 'sometimes|required|string|max:255',
            'cargo_description'   => 'sometimes|required|string',
            'weight_kg'           => 'nullable|numeric|min:0',
            'scheduled_date'      => 'sometimes|required|date',
            'notes'               => 'nullable|string',
        ]);

        $transportOrder->update($validated);
        $transportOrder->load('driver');

        return response()->json($transportOrder);
    }

    public function advanceStatus(TransportOrder $transportOrder): JsonResponse
    {
        $next = $transportOrder->nextStatus();

        if (!$next) {
            return response()->json(['message' => 'Order is already at final status.'], 422);
        }

        $transportOrder->update(['status' => $next]);
        $transportOrder->load('driver');

        return response()->json($transportOrder);
    }

    public function destroy(TransportOrder $transportOrder): JsonResponse
    {
        if ($transportOrder->status !== 'pending') {
            return response()->json(['message' => 'Only pending orders can be deleted.'], 422);
        }

        $transportOrder->delete();
        return response()->json(null, 204);
    }

    private function generateOrderNumber(): string
    {
        $last = TransportOrder::max('id') ?? 0;
        return sprintf('OC-%05d', $last + 1);
    }
}
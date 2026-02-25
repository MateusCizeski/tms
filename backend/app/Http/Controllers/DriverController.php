<?php
namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    public function index(): JsonResponse
    {
        $drivers = Driver::orderBy('name')->get();
        return response()->json($drivers);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:150',
            'cpf'          => 'required|string|max:14|unique:drivers,cpf',
            'cnh_number'   => 'required|string|max:20|unique:drivers,cnh_number',
            'cnh_category' => 'required|in:A,B,C,D,E',
            'phone'        => 'nullable|string|max:20',
        ]);

        $driver = Driver::create($validated);
        return response()->json($driver, 201);
    }

    public function update(Request $request, Driver $driver): JsonResponse
    {
        $validated = $request->validate([
            'name'         => 'sometimes|required|string|max:150',
            'cpf'          => 'sometimes|required|string|max:14|unique:drivers,cpf,' . $driver->id,
            'cnh_number'   => 'sometimes|required|string|max:20|unique:drivers,cnh_number,' . $driver->id,
            'cnh_category' => 'sometimes|required|in:A,B,C,D,E',
            'phone'        => 'nullable|string|max:20',
        ]);

        $driver->update($validated);
        return response()->json($driver);
    }

    public function toggleActive(Driver $driver): JsonResponse
    {
        $driver->update(['is_active' => !$driver->is_active]);
        return response()->json($driver);
    }
}
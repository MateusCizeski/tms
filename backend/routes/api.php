<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\TransportOrderController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
});

Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get ('me',     [AuthController::class, 'me']);

    Route::get   ('dashboard', [TransportOrderController::class, 'dashboard']);

    Route::get   ('drivers',                        [DriverController::class, 'index']);
    Route::post  ('drivers',                        [DriverController::class, 'store']);
    Route::put   ('drivers/{driver}',               [DriverController::class, 'update']);
    Route::patch ('drivers/{driver}/toggle-active', [DriverController::class, 'toggleActive']);

    Route::get   ('transport-orders',                          [TransportOrderController::class, 'index']);
    Route::post  ('transport-orders',                          [TransportOrderController::class, 'store']);
    Route::put   ('transport-orders/{transportOrder}',         [TransportOrderController::class, 'update']);
    Route::patch ('transport-orders/{transportOrder}/advance', [TransportOrderController::class, 'advanceStatus']);
    Route::delete('transport-orders/{transportOrder}',         [TransportOrderController::class, 'destroy']);
});
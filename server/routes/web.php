<?php

use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::post('/register', [AuthController::class,'register']);
Route::post('/login', [AuthController::class,'login']);
Route::post('/logout', [AuthController::class,'logout'])->middleware('auth:sanctum');


// PUBLIC
Route::get('/products', [ProductController::class,'index']);
Route::get('/products/{product}', [ProductController::class,'show']);


// CUSTOMER AUTH
Route::middleware('auth:sanctum')->group(function(){
Route::post('/orders', [OrderController::class,'store']);
Route::get('/orders', [OrderController::class,'userOrders']);

// Payment routes
Route::post('/payment/initialize', [PaymentController::class,'initialize']);
Route::get('/payment/callback', [PaymentController::class,'callback']);
Route::get('/payment/verify/{reference}', [PaymentController::class,'verify']);
});


// ADMIN
Route::middleware(['auth:sanctum','admin'])->group(function(){
Route::apiResource('admin/products', ProductController::class);
Route::get('/admin/orders', [AdminOrderController::class,'index']);
Route::put('/admin/orders/{id}/status', [AdminOrderController::class,'updateStatus']);
});
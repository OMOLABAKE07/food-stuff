<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HelpController;
use App\Http\Controllers\HelpCategoryController;
use App\Http\Controllers\HelpTopicController;
use App\Http\Controllers\HelpArticleController;

// Add CSRF cookie route for SPA authentication
Route::get('/sanctum/csrf-cookie', function (Request $request) {
    return response()->json(['message' => 'CSRF cookie set']);
})->middleware(EnsureFrontendRequestsAreStateful::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);

// Help routes
Route::get('/help/menu', [HelpController::class, 'getMenu']);
Route::get('/help/topics', [HelpController::class, 'getAllTopics']);
Route::get('/help/topics/{topicSlug}', [HelpController::class, 'getTopic']);
Route::get('/help/categories', [HelpController::class, 'getCategoriesWithTopics']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'userOrders']);

    Route::post('/payment/initialize', [PaymentController::class, 'initialize']);
    Route::get('/payment/callback', [PaymentController::class, 'callback']);
    Route::get('/payment/verify/{reference}', [PaymentController::class, 'verify']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('admin')->group(function() {
        Route::apiResource('/products', ProductController::class);
        Route::get('/orders', [AdminOrderController::class, 'index']);
        Route::put('/orders/{id}/status', [AdminOrderController::class, 'updateStatus']);
        
        // Admin help routes
        Route::apiResource('/help/categories', HelpCategoryController::class);
        Route::apiResource('/help/topics', HelpTopicController::class);
        Route::apiResource('/help/articles', HelpArticleController::class);
    });
});
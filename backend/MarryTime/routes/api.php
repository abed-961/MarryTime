<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('/user')->group(function () {
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);


    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/logout', [UserController::class, 'logout']);
        Route::get('/dashboard', [UserController::class, 'userDashboardDetails']);
        Route::post('/edit/data', [UserController::class, "editUser"]);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get("/getVendorId", [VendorsController::class, "getVendorId"]);
    Route::get("/vendor-tasks", [VendorsController::class, 'loadTasks']);
    Route::post("/{vendor}/vendor-tasks", [VendorsController::class, 'addTask']);
    Route::get("/vendor/filter", [VendorsController::class, 'vendorTaskFilter']);
    Route::put('/vendor-tasks/{task}', [VendorsController::class, 'updateStatus']);
        Route::delete('/{task}/vendor-tasks', [VendorsController::class, 'destroy']);




});
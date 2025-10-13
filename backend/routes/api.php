<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Photos;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
// without credantials
Route::get("/appointment/suggest/all" , [AdminController::class , "showAllSuggest"]);
Route::get('/getPhotos', [Photos::class, 'index']);

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

    //user vendors
    Route::get('/user/{appointment}/vendors', [UserController::class, 'getUserVendors']);
    Route::get('/user/{vendor}/getVendor', [VendorsController::class, 'getVendorById']);



    //appointment page 
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::get('/vendors', [VendorsController::class, 'index']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/user/appointments', [UserController::class, 'getUserWithAppointments']);
    Route::delete('/appointment/{appointment}/delete', [AppointmentController::class, 'destroy']);



    //notification 
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{notification}/read', [NotificationController::class, 'markRead']);
    Route::delete('/{notification}/notifications', [NotificationController::class, 'destroy']);


    //feedback
    Route::get('/feedbacks/latest', [FeedbackController::class, 'latest']);
    Route::get('/feedbacks', [FeedbackController::class, 'index']);
    Route::post('/user/{vendor}/feedback', [FeedbackController::class, 'store']);

    //admin routes 
    Route::get("/appointment/all", [AdminController::class, "getAppointments"]);
    Route::post("/appointment/suggest" , [AdminController::class , "insertSuggestAppointment"]) ;







});
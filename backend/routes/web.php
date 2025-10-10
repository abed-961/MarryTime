<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\ExpensesController;
use App\Http\Controllers\ExpensesCategoryController;


    Route::get('expenses/list', [ExpensesController::class, 'index']);
    Route::post('expenses/store', [ExpensesController::class, 'store']);



    Route::get('expensesCategory/list', [ExpensesCategoryController::class, 'index']);
    Route::post('expensesCategory/store', [ExpensesCategoryController::class, 'store']);


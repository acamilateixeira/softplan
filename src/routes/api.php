<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CakeController;

Route::get('/ping', fn () => ['pong' => true]);

Route::get('/cakes/summary', [CakeController::class, 'summary']);
Route::get('/cakes/export', [CakeController::class, 'export']);

Route::apiResource('cakes', CakeController::class);

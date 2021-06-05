<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\User\Account;
use App\Http\Controllers\Staff\Users;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware(['auth'])->group(function () {
    // user actions
    Route::post('/account/information', [Account::class, 'information']);
    Route::post('/account/password', [Account::class, 'password']);
    // admin actions 
    Route::middleware(['role:admin'])->group(function () {
        Route::get("/admin/users",[Users::class, 'index']);
        Route::delete("/admin/users/{id}",[Users::class, 'destroy']);
        Route::post("/admin/users/{id}",[Users::class, 'update']);
    });
});

Route::get('{any}', function () {
    return Inertia::render('main', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->where('any', '.*');



require __DIR__.'/auth.php';

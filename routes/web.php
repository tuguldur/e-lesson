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
    Route::post('/account/avatar', [Account::class, 'avatar']);
    Route::post("/account/teacher", [Account::class, 'teacher'])->middleware(['role:teacher']);
    // admin actions 
    Route::middleware(['role:admin'])->group(function () {
        Route::get("/admin/users",[Users::class, 'index']);
        Route::post("/admin/users/add",[Users::class, 'store']);
        Route::delete("/admin/users/{id}",[Users::class, 'destroy']);
        Route::post("/admin/users/{id}",[Users::class, 'update']);
    });
});

Route::get('{all?}', function () {
    return Inertia::render('main', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->where('all', '([A-z\d\-\/_]+)?');


require __DIR__.'/auth.php';

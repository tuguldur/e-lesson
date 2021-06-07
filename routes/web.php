<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\User\Account;
use App\Http\Controllers\Staff\Users;
use App\Http\Controllers\Staff\LessonController;
use App\Http\Controllers\Staff\EpisodeController;
use App\Http\Controllers\Staff\EnrollController;
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
    Route::get("/lessons",[LessonController::class, 'list']);
    
    Route::middleware(['role:admin,teacher'])->group(function () {
        Route::get("/teacher/users",[LessonController::class, 'users']);
        Route::get("/teacher/lessons",[LessonController::class, 'index']);
        Route::post("/teacher/lessons/add",[LessonController::class, 'create']);
        Route::get("/teacher/lessons/{id}",[LessonController::class, 'show']);
        Route::post("/teacher/lessons/{id}",[LessonController::class, 'update']);

        Route::get("/teacher/lessons/{id}/student",[LessonController::class, 'student']);
        Route::delete("/teacher/lessons/{id}",[LessonController::class, 'destroy']);
        // lesson episodes
        Route::post('/teacher/episode/video', [EpisodeController::class, 'store']);
        Route::post('/teacher/episode/add', [EpisodeController::class, 'create']);
        Route::post('/teacher/episode/{id}', [EpisodeController::class, 'update']);
        Route::get('/teacher/episode/{id}', [EpisodeController::class, 'index']);
        Route::delete("/teacher/episode/{id}",  [EpisodeController::class, 'destroy']);
        // enroll a student
        Route::post('/teacher/lessons/{id}/enroll/{student}', [EpisodeController::class, 'enroll']);
        Route::get("/teacher/enroll/{id}",[EnrollController::class, 'index']);
        Route::delete("/teacher/enroll/{id}",[EnrollController::class, 'destroy']);

    });
});

Route::get('{all?}', function () {
    return Inertia::render('main', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->where('all', '([A-z\d\-\/_]+)?');


require __DIR__.'/auth.php';

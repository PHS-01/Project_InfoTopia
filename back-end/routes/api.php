<?php

use App\Http\Controllers\Api\{
    UserController, ClasseController,
    CommentController, CourseController,
    PostController, RoleController,
    PasswordRequestController
};
use Illuminate\Support\Facades\{
    Auth, Response, Route
};


Route::post('/register', [UserController::class, 'register'])->name('register');
Route::post('/login', [UserController::class, 'login'])->name('login');
Route::prefix('password')->name('password.')->controller(PasswordRequestController::class)->group(function () {
    Route::post('/solicitation', 'solicitation')->name('solicitation');
    Route::post('/password-reset/{token}', 'setNewPassword')->name('set-new-password');
});
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [UserController::class, 'logout'])->name('logout');
    
    Route::prefix('users')->name('users.')->controller(UserController::class)->group(function () {
        Route::get('{user}/classes', 'userClasses' )->name('classes');
        Route::get('/current', 'currentUser')->name('currentUser');
        Route::post('/{user}', 'update')->name('update');
    });
    Route::apiResource('users', UserController::class)->except(['store', 'update']);
    
    Route::get('roles-users', [RoleController::class, 'showUsersByRole'])->name('users');
    Route::prefix('roles')->name('roles.')->controller(RoleController::class)->group(function () {
        Route::post('{role}/assing', 'assingRole')->name('assing');
        Route::delete('{role}/remove', 'removeRole')->name('remove');
    });
    Route::apiResource('roles', RoleController::class);

    Route::apiResource('courses', CourseController::class);
    
    Route::prefix('classes')->name('classes.')->controller(ClasseController::class)->group(function () {
        Route::post('{class}', 'update')->name('update');
        Route::post('{class}/assing', 'createLeaders')->name('create.leaders');
        Route::delete('{class}/remove', 'removeLeaders')->name('remove.leaders');
    });
    Route::apiResource('classes', ClasseController::class)->except(['update']);
    
    Route::apiResource('posts', PostController::class)->except(['update']);
    Route::post('posts/{post}', [PostController::class, 'update'])->name('posts.update');

    Route::get('/auth/check', fn () => response()->json(['authenticated' => Auth::check()]));
    Route::apiResource('comments', CommentController::class);
});

Route::get('/documentation', function () {
    return Response::file('api/openapi.yaml', [
        'Content-Type' => 'text/yaml',
    ]);
});
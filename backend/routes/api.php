<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\AuthController as UserAuthController;
use App\Http\Controllers\AssessmentController;

// ========== Auth ==========
Route::prefix('auth')->group(function () {
    Route::post('/signup',          [UserAuthController::class, 'register']);
    Route::post('/signin',          [UserAuthController::class, 'login']);
    Route::post('/send-otp',        [UserAuthController::class, 'sendOtp']);
    Route::post('/resend-otp',      [UserAuthController::class, 'resendOtp']);
    Route::post('/verify-otp',      [UserAuthController::class, 'verifyOtp']);
    Route::post('/forget-password', [UserAuthController::class, 'forgetPassword']);
    Route::post('/reset-password',  [UserAuthController::class, 'resetPassword']);
});

// ========== Protected Routes ==========
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout',      [UserAuthController::class, 'logout']);
    Route::get('/profile',           [UserAuthController::class, 'getProfile']);
    Route::put('/profile',           [UserAuthController::class, 'updateProfile']);
    Route::get('/profile/history',   [AssessmentController::class, 'history']);

    Route::get('/assessment/questions',  [AssessmentController::class, 'getQuestions']);
    Route::post('/assessment/submit',    [AssessmentController::class, 'submitAssessment']);
});
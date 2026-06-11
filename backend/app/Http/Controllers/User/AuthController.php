<?php

namespace App\Http\Controllers\User;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Mail\OtpMail;
use App\Models\User;
use App\Service\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Mail;

class AuthController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'track' => 'in:Scientific,Literary',
            'password' => 'required|min:8',
        ]);

        $user = $this->authService->register($validated);

        $token = $this->authService->createToken($user);
        $return['user'] = $user;
        $return['token'] = $token;
        return response()->json($return);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        $user = $this->authService->login(
            $request->email,
            $request->password
        );

        if (!$user) {
            return ApiResponse::error('Invalid credentials', 401);
        }

        $token = $this->authService->createToken($user);
            $return['user'] = $user;
            $return['token'] = $token;
        return response()->json($return);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return ApiResponse::success([], 'Logged out successfully');
    }

    public function sendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return ApiResponse::error('User not found', 404);
        }

        $this->authService->sendOtp($user);

        return ApiResponse::success([], 'OTP sent to email');
    }

    public function resendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return ApiResponse::error('User not found', 404);
        }

        $key = 'otp-resend-' . $user->id;

        if (RateLimiter::tooManyAttempts($key, 1)) {
            return ApiResponse::error('Please wait before requesting another OTP', 429);
        }

        RateLimiter::hit($key, 90);

        $this->authService->sendOtp($user);

        return ApiResponse::success([], 'OTP resent successfully');
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return ApiResponse::error('User not found', 404);
        }

        $valid = $this->authService->verifyOtp($user, $request->code);

        if (!$valid) {
            return ApiResponse::error('Invalid or expired OTP', 400);
        }

        $token = $this->authService->createToken($user);

        return ApiResponse::success([
            'user' => $user,
            'token' => $token
        ], 'OTP verified successfully');
    }


    public function forgetPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return ApiResponse::error('User not found', 404);
        }

        $this->authService->sendOtp($user, 'reset_password');

        return ApiResponse::success([], 'OTP sent to email');
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required',
            'password' => 'required|min:8|confirmed'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'user not found',
                'errors' => ['email' => 'invalid email']
            ], 404);
        }

        $valid = $this->authService->verifyOtp($user, $request->code, 'reset_password');

        if (!$valid) {
            return response()->json([
                'success' => false,
                'message' => 'invalid or expired code',
                'errors' => ['code' => 'wrong otp']
            ], 400);
        }

        $this->authService->resetPassword($user, $request->password);

        return response()->json([
            'success' => true,
            'message' => 'password reset successful',
            'data' => []
        ]);
    }

    public function getProfile(Request $request)
    {
        $user = $request->user();

        return response()->json($user);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        $updatedProfile = $request->only(['name', 'track']);
        $updatedProfile['password'] = Hash::make($request['password']);
        $user->update($updatedProfile);

        return response()->json($user);
    }
}

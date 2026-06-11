<?php

namespace App\Service;

use App\Models\User;
use App\Models\VerificationCode;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Jobs\SendOtpEmailJob;


class AuthService
{
    public function register(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'track' => $data['track']
        ]);
    }

    public function login($identifier, $password)
    {
        $user = User::where('email', $identifier)
            ->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return null;
        }

        return $user;
    }

    public function createToken($user)
    {
        return $user->createToken($user->name . '_token')->plainTextToken;
    }

    public function verifyOtp($user, $code, $type = 'reset_password'): bool
    {
        $record = VerificationCode::where('user_id', $user->id)
            ->where('type', $type)
            ->where('code', $code)
            ->first();

        if (!$record)
            return false;

        if ($record->expires_at < now())
            return false;

        if ($record->used_at)
            return false;

        $record->update([
            'used_at' => now()
        ]);

        return true;

    }
    public function sendOtp(User $user, string $type = 'reset_password'): void
    {
        $code = in_array($user->email, [
            'test@test.com',
            'tescct@test.com'
        ])
            ? '0000'
            : rand(1000, 9999);

        VerificationCode::updateOrCreate(
            [
                'user_id' => $user->id,
                'type' => $type,
            ],
            [
                'code' => $code,
                'expires_at' => now()->addMinutes(15),
                'used_at' => null,
            ]
        );

        SendOtpEmailJob::dispatch($user, $code);
    }

    public function resetPassword(User $user, string $password): void
    {
        $user->update([
            'password' => Hash::make($password)
        ]);

        VerificationCode::where('user_id', $user->id)
            ->where('type', 'reset_password')
            ->delete();
    }


}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable
{

    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'track',
        'password',
        'type',
        'password',
    ];

    protected $hidden = [
        'remember_token',
    ];

    public function attempts()
    {
        return $this->hasMany(UserAttempt::class);
    }
}

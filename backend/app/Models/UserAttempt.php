<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAttempt extends Model
{
    protected $table = 'user_attempts';

    protected $fillable = [
        'user_id',
        'assessment_id',
        'total_score',
        'started_at',
        'completed_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function assessment()
    {
        return $this->belongsTo(Assessment::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class, 'attempt_id');
    }
}

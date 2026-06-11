<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResultMapping extends Model
{
    protected $table = 'results_mapping';

    protected $fillable = [
        'tag',  
        'min_score',
        'max_score',
        'recommendation',
    ];
}
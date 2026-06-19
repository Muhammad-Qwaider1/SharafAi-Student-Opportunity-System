<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OptionStreamWeight extends Model
{
    use HasFactory;
    protected $fillable = [
        'option_id',
        'stream',
        'weight',
    ];
        public function option()
    {
        return $this->belongsTo(Option::class);
    }

}

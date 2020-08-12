<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VerificationCode extends Model
{
    //
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'verification_code',
        'validity',
    ];

}

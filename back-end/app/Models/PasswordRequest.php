<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class PasswordRequest extends Model
{
    protected $table = 'password_requests';

    protected $fillable = [
        'user_id',
        'token',
        'activated', // Define se o token já foi usado (1) ou não (0); default = 0
    ];

    protected function casts() {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function isValidToken() : Attribute
    {
        return Attribute::make(
            get: fn () => isMoreThanTenMinutesAgo($this->created_at)
        );
    }
}

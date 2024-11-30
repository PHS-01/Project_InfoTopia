<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'image',
        'description',
        'user_id',
        'classe_id',
        'is_approved',
        'important',
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

    public function classe() {
        return $this->belongsTo(Classe::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }
}

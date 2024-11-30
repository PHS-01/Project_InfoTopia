<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    protected $fillable = [
        'name',
        'profile_photo',
        'cover_photo',
        'course_id',
        'year'
    ];

    public function course() {
        return $this->belongsTo(Course::class);
    }

    public function users() {
        return $this->belongsToMany(User::class);
    }

    public function posts() {
        return $this->hasMany(Post::class);
    }
}

<?php

namespace App\Http\Resources;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClasseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'profile_photo' => $this->profile_photo,
            'cover_photo' => $this->cover_photo,
            'course_id' => $this->course_id,
            'year' => $this->year,
            'posts' => collect($this->posts()->orderByDesc('important')->orderByDesc('updated_at')->get()),
            'course' => new CourseResource($this->course),
        ];
    }
}

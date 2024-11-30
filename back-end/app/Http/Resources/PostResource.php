<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'classe_id' => $this->classe_id,
            'user_id' => $this->user_id,
            'description' => $this->description,
            'image' => $this->image,
            'created_at' => $this->created_at->format('d/m/Y'),
            'updated_at' => $this->updated_at->format('d/m/Y'),
            'classe' => new ClasseResource($this->classe),
            'is_approved' => $this->is_approved,
            'important' => $this->important,
            'comments' => collect($this->comments),
            'user' => new UserResource($this->user)
        ];
    }
}

<?php

namespace App\Http\Resources;

use App\Models\Classe;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email' => $this->email,
            'profile_photo' => $this->profile_photo,
            'matriculation' => $this->matriculation,
            'classes' => hasRoles(User::find($this->id), ['Administrador'])
                ? collect(
                    Classe::with(['posts.user', 'course:id,name'])
                    ->select('classes.id', 'name', 'year', 'profile_photo', 'cover_photo', 'course_id')
                    ->get()
                )
                : collect(
                    $this->classes()->with(['posts.user', 'course:id,name'])
                    ->select('classes.id', 'name', 'year', 'profile_photo', 'cover_photo', 'course_id')->get()
                ),
            'roles' => collect($this->roles->map(fn ($role) => ['id' => $role->id, 'name' => $role->name])),
        ];
    }
}

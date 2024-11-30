<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;

class CommentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return Auth::check();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return Auth::check();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Comment $comment): bool
    {
        return $user->comments->contains($comment)
            || (hasRoles($user, ['Líder']) && isLeader($user, $comment->post->classe))
            || hasRoles($user, ['Administrador']);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Comment $comment): bool
    {
        return $user->comments->contains($comment)
            || (hasRoles($user, ['Líder']) && isLeader($user, $comment->post->classe))
            || hasRoles($user, ['Administrador']);
    }
}

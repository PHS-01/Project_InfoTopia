<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\{
    Classe, User
};
use Illuminate\Support\Facades\Auth;

class ClassePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return Auth::check();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Classe $classe): bool
    {
        return Auth::check();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return hasRoles($user, ['Administrador', 'Líder']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Classe $classe): bool
    {
        return hasRoles($user, ['Administrador']) || (hasRoles($user, ['Líder']) && isLeader($user, $classe));
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Classe $classe): bool
    {
        return hasRoles($user, ['Administrador']);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Classe $classe): bool
    {
        return hasRoles($user, ['Administrador']);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Classe $classe): bool
    {
        return hasRoles($user, ['Administrador']);
    }
}

<?php

use Illuminate\Http\Request;
use App\Models\{
    Classe, User, Role
};
use Carbon\Carbon;
use Illuminate\Support\Facades\{
    File, Http, Storage
};

/**
 * Retorna o nome de um arquivo hasheado
 * 
 * @param mixed $image
 * 
 * @return string
 */
function hashedFilename(mixed $image): string
{
    return hash('sha256', time() . $image->getClientOriginalName()) . '.' . $image->getClientOriginalExtension();
}

/**
 * Deleta um arquivo
 * 
 * @param string $path
 * 
 * @return bool
 */
function deleteFile(string $path): bool
{
    return File::exists($path) ? File::delete($path) : false;
}

/**
 * Retorna o nome do arquivo hasheado a partir de uma URL.
 * 
 * @param string $url
 * @param string $extension
 * 
 * @return string
 */
function hashedFilenameFromUrl(string $url, string $extension): string
{
    return hash('sha256', time() . parse_url($url, PHP_URL_PATH)) . '.' . $extension;
}

/**
 * Salva um arquivo, seja da request ou de uma URL, e deleta o arquivo antigo se houver.
 * 
 * @param Request $request
 * @param string $field
 * @param string $dir
 * @param string $oldFile
 * @param string|null $url
 * 
 * @return string|false Caminho do arquivo ou false quando o arquivo é inválido
 */
function saveFile(Request $request, string $field, string $dir, string $oldFile = '', string $url = null): string|false
{
    if ($request->hasFile($field)) {
        $image = $request->file($field);
        $path = $image->storeAs($dir, hashedFilename($image), 'public');
        deleteFile("storage/$oldFile");
        return $path;
    } elseif ($url) {
        $response = Http::get($url);
        if ($response->successful()) {
            $extension = pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg';
            $filename = hashedFilenameFromUrl($url, $extension);
            $path = "$dir/$filename";
            Storage::disk('public')->put($path, $response->body());
            deleteFile("storage/$oldFile");
            return $path;
        }
        return false;
    }

    return false;
}

/**
 * Verifica se o usuário tem os cargos passados por parâmetro
 * 
 * @param User $user
 * @param array $rolesNames
 * 
 * @return bool
 */
function hasRoles(User $user, array $rolesNames) : bool
{
    $roles = Role::whereIn('name', $rolesNames)->get();

    foreach ($roles as $role) {
        if ($user->roles->contains($role)) return true;
    }

    return false;
}

/**
 * Verifica se o usuário é líder de uma turma
 * 
 * @param User $user
 * @param Classe $class
 * 
 * @return bool
 */
function isLeader(User $user, Classe $class) : bool
{
    return $class->users->contains($user);
}

/**
 * Verifica se já se passaram 10 ou mais minutos de uma data específica até o momento
 * 
 * @param $datetime
 * 
 * @return bool
 */
function isMoreThanTenMinutesAgo($datetime) : bool
{
    if (!$datetime instanceof Carbon) $datetime = Carbon::parse($datetime);
    return $datetime->diffInMinutes(now()) >= 10;
}
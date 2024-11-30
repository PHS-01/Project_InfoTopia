<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use AkemiAdam\IfrnFaker\Faker;
use App\Models\{
    User, Role
};

class UserSeeder extends Seeder
{
    public function __construct(
        private Faker $faker
    ) {}

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::firstOrCreate(['email' => 'admin@gmail.com'], [
            'name' => 'admin',
            'password' => Hash::make('senhateste'),
            'matriculation' => $this->faker->student()->enrolment(),
        ]);

        $role = Role::where('name', 'Administrador')->first();
        
        if (!$role->users->contains($user)) $role->users()->attach($user);
    }
}

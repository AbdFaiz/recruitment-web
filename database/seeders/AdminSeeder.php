<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@recruitment.com',
            'password' => bcrypt('password'),
        ]);

        $admin->assignRole(Role::findByName('admin'));
    }
}

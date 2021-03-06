<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::insert([
            'name' => 'Admin',
            'email' => env('MAIL_USERNAME'),
            'phone' => "11223311",
            'role' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
            'password' => Hash::make('password'),
        ]);
        User::factory(50)->create();
    }
}

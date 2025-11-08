<?php

namespace Database\Seeders;

use App\Models\Reminder;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ReminderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a test user
        $user = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
            ]
        );

        // Create demo reminders
        $now = now();
        
        // Reminder due in 2 minutes
        Reminder::create([
            'user_id' => $user->id,
            'title' => 'Demo Reminder - 2 Minutes',
            'description' => 'This reminder is due in 2 minutes. Perfect for testing notifications!',
            'due_at' => $now->copy()->addMinutes(2),
        ]);

        // Reminder due in 1 hour
        Reminder::create([
            'user_id' => $user->id,
            'title' => 'Demo Reminder - 1 Hour',
            'description' => 'This reminder is due in 1 hour.',
            'due_at' => $now->copy()->addHour(),
        ]);

        // Reminder due tomorrow
        Reminder::create([
            'user_id' => $user->id,
            'title' => 'Demo Reminder - Tomorrow',
            'description' => 'This reminder is due tomorrow.',
            'due_at' => $now->copy()->addDay(),
        ]);
    }
}

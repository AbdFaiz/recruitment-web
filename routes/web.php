<?php

use App\Models\JobVacancy;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $vacancies = JobVacancy::with(['region', 'position'])
        ->where('status', 'open')
        ->where('deadline', '>=', now())
        ->latest()
        ->get();

    return inertia('welcome', ['vacancies' => $vacancies]);
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        if ($user->hasRole('admin')) {
            return redirect()->route('admin.dashboard');
        }

        return redirect()->route('candidate.dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
require __DIR__.'/candidate.php';

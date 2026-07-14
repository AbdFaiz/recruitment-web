<?php

use App\Http\Controllers\Candidate\ApplicationController;
use App\Http\Controllers\Candidate\BiodataController;
use App\Http\Controllers\Candidate\DashboardController;
use App\Http\Controllers\Candidate\TestController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:candidate'])->prefix('candidate')->name('candidate.')->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Biodata
    Route::get('biodata', [BiodataController::class, 'edit'])->name('biodata.edit');
    Route::put('biodata/personal', [BiodataController::class, 'updatePersonal'])->name('biodata.personal.update');
    Route::post('biodata/education', [BiodataController::class, 'storeEducation'])->name('biodata.education.store');
    Route::put('biodata/education/{education}', [BiodataController::class, 'updateEducation'])->name('biodata.education.update');
    Route::delete('biodata/education/{education}', [BiodataController::class, 'destroyEducation'])->name('biodata.education.destroy');
    Route::post('biodata/experience', [BiodataController::class, 'storeExperience'])->name('biodata.experience.store');
    Route::put('biodata/experience/{experience}', [BiodataController::class, 'updateExperience'])->name('biodata.experience.update');
    Route::delete('biodata/experience/{experience}', [BiodataController::class, 'destroyExperience'])->name('biodata.experience.destroy');
    Route::post('biodata/family', [BiodataController::class, 'storeFamily'])->name('biodata.family.store');
    Route::put('biodata/family/{family}', [BiodataController::class, 'updateFamily'])->name('biodata.family.update');
    Route::delete('biodata/family/{family}', [BiodataController::class, 'destroyFamily'])->name('biodata.family.destroy');
    Route::post('biodata/complete', [BiodataController::class, 'complete'])->name('biodata.complete');

    // Application
    Route::get('apply', [ApplicationController::class, 'index'])->name('apply.index');
    Route::post('apply', [ApplicationController::class, 'store'])->name('apply.store');

    // Tests
    Route::get('tests', [TestController::class, 'index'])->name('tests.index');
    Route::get('tests/{test}/take', [TestController::class, 'show'])->name('tests.show');
    Route::post('tests/{test}/start', [TestController::class, 'start'])->name('tests.start');
    Route::post('tests/{test}/submit', [TestController::class, 'submit'])->name('tests.submit');
    Route::get('application-status', [TestController::class, 'status'])->name('application.status');
});

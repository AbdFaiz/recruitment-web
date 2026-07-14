<?php

use App\Http\Controllers\Admin\ApplicantController;
use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DivisionController;
use App\Http\Controllers\Admin\EchelonController;
use App\Http\Controllers\Admin\GradeController;
use App\Http\Controllers\Admin\JobVacancyController;
use App\Http\Controllers\Admin\PositionController;
use App\Http\Controllers\Admin\RegionController;
use App\Http\Controllers\Admin\TestController;
use App\Http\Controllers\Admin\WorkunitController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Master Data
    Route::resource('companies', CompanyController::class)->except(['show']);
    Route::resource('divisions', DivisionController::class)->except(['show']);
    Route::resource('workunits', WorkunitController::class)->except(['show']);
    Route::resource('positions', PositionController::class)->except(['show']);
    Route::resource('echelons', EchelonController::class)->except(['show']);
    Route::resource('grades', GradeController::class)->except(['show']);
    Route::resource('regions', RegionController::class)->except(['show']);

    // Recruitment
    Route::resource('vacancies', JobVacancyController::class)->except(['show']);
    Route::resource('tests', TestController::class)->except(['show']);
    Route::get('tests/{test}/questions', [TestController::class, 'questions'])->name('tests.questions');
    Route::post('tests/{test}/questions', [TestController::class, 'storeQuestion'])->name('tests.questions.store');
    Route::put('tests/{test}/questions/{question}', [TestController::class, 'updateQuestion'])->name('tests.questions.update');
    Route::delete('tests/{test}/questions/{question}', [TestController::class, 'destroyQuestion'])->name('tests.questions.destroy');

    // Applicants
    Route::get('applicants', [ApplicantController::class, 'index'])->name('applicants.index');
    Route::get('applicants/{application}', [ApplicantController::class, 'show'])->name('applicants.show');
    Route::put('applicants/{application}/status', [ApplicantController::class, 'updateStatus'])->name('applicants.status.update');

    // Notifications
    Route::post('notifications/{notification}/read', [ApplicantController::class, 'markNotificationRead'])->name('notifications.read');
    Route::post('notifications/read-all', [ApplicantController::class, 'markAllNotificationsRead'])->name('notifications.read-all');
});

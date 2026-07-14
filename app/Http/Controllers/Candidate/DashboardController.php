<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $candidate = Candidate::with(['application.vacancy.region', 'application.vacancy.position', 'application.testResults.test'])
            ->where('user_id', $user->id)
            ->first();

        $applications = Application::with(['vacancy.region', 'vacancy.position', 'testResults.test'])
            ->whereHas('candidate', fn ($q) => $q->where('user_id', $user->id))
            ->latest('applied_at')
            ->get();

        return Inertia::render('candidate/dashboard', [
            'candidate' => $candidate,
            'applications' => $applications,
            'biodataComplete' => $candidate?->isComplete() ?? false,
        ]);
    }
}

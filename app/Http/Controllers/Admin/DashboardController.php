<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Candidate;
use App\Models\RecNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $stats = [
            'total_candidates' => Candidate::count(),
            'total_applications' => Application::count(),
            'pending_applications' => Application::where('status', 'submitted')->count(),
            'unread_notifications' => RecNotification::unread()->count(),
        ];

        $recentApplications = Application::with(['candidate.user', 'vacancy.region', 'vacancy.position'])
            ->latest()
            ->take(10)
            ->get();

        $notifications = RecNotification::unread()
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentApplications' => $recentApplications,
            'notifications' => $notifications,
        ]);
    }
}

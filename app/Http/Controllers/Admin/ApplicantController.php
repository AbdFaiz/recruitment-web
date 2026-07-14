<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\RecNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicantController extends Controller
{
    public function index(Request $request)
    {
        $query = Application::with(['candidate.user', 'vacancy.region', 'vacancy.position']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('region_id')) {
            $query->whereHas('vacancy', fn ($q) => $q->where('region_id', $request->region_id));
        }
        if ($request->filled('position_id')) {
            $query->whereHas('vacancy', fn ($q) => $q->where('position_id', $request->position_id));
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('candidate.user', fn ($q) => $q->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%"));
        }

        $applications = $query->latest('applied_at')->paginate(15);

        return Inertia::render('admin/applicants/index', ['applications' => $applications]);
    }

    public function show(Application $application)
    {
        $application->load([
            'candidate.user',
            'vacancy.region',
            'vacancy.position',
            'testResults.test',
            'testAnswers.question',
        ]);

        return Inertia::render('admin/applicants/show', ['application' => $application]);
    }

    public function updateStatus(Request $request, Application $application)
    {
        $validated = $request->validate([
            'status' => 'required|in:submitted,reviewing,testing,interview,offered,accepted,rejected',
            'hr_notes' => 'nullable|string',
        ]);

        $application->update($validated);

        return back()->with('success', 'Status berhasil diperbarui.');
    }

    public function markNotificationRead(RecNotification $notification)
    {
        $notification->markAsRead();

        return back();
    }

    public function markAllNotificationsRead()
    {
        RecNotification::unread()->update(['read_at' => now()]);

        return back();
    }
}

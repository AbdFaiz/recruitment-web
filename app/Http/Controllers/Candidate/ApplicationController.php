<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Candidate;
use App\Models\JobVacancy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $candidate = Candidate::where('user_id', $user->id)->first();

        if (! $candidate || ! $candidate->isComplete()) {
            return redirect()->route('candidate.biodata.edit')
                ->with('error', 'Silakan lengkapi biodata terlebih dahulu.');
        }

        $vacancies = JobVacancy::with(['region', 'position'])
            ->where('status', 'open')
            ->where('deadline', '>=', now())
            ->get();

        $existingApplication = Application::where('candidate_id', $candidate->id)->first();

        return Inertia::render('candidate/apply', [
            'vacancies' => $vacancies,
            'existingApplication' => $existingApplication,
            'candidate' => $candidate,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $candidate = Candidate::where('user_id', $user->id)->first();

        if (! $candidate || ! $candidate->isComplete()) {
            return back()->with('error', 'Silakan lengkapi biodata terlebih dahulu.');
        }

        $existingApplication = Application::where('candidate_id', $candidate->id)->first();
        if ($existingApplication) {
            return back()->with('error', 'Anda sudah mengajukan lamaran.');
        }

        $validated = $request->validate([
            'vacancy_id' => 'required|exists:rec_job_vacancies,id',
            'notes' => 'nullable|string',
        ]);

        Application::create([
            'candidate_id' => $candidate->id,
            'vacancy_id' => $validated['vacancy_id'],
            'notes' => $validated['notes'] ?? null,
            'status' => 'submitted',
            'applied_at' => now(),
        ]);

        return redirect()->route('candidate.application.status')
            ->with('success', 'Lamaran berhasil dikirim.');
    }
}

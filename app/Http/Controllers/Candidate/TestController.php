<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Test;
use App\Models\TestAnswer;
use App\Models\TestResult;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $application = Application::with(['vacancy.region', 'vacancy.position', 'testResults.test'])
            ->whereHas('candidate', fn ($q) => $q->where('user_id', $user->id))
            ->latest('applied_at')
            ->first();

        if (! $application) {
            return redirect()->route('candidate.dashboard')
                ->with('error', 'Anda belum mengajukan lamaran.');
        }

        $tests = Test::where('is_active', true)->get();
        $testResults = $application->testResults;

        return Inertia::render('candidate/tests', [
            'application' => $application,
            'tests' => $tests,
            'testResults' => $testResults,
        ]);
    }

    public function show(Test $test, Request $request)
    {
        $user = $request->user();
        $application = Application::whereHas('candidate', fn ($q) => $q->where('user_id', $user->id))
            ->latest('applied_at')
            ->first();

        if (! $application) {
            return redirect()->route('candidate.dashboard')
                ->with('error', 'Anda belum mengajukan lamaran.');
        }

        $existingResult = TestResult::where('application_id', $application->id)
            ->where('test_id', $test->id)
            ->first();

        if ($existingResult && $existingResult->completed_at) {
            return back()->with('error', 'Anda sudah mengerjakan test ini.');
        }

        $test->load('questions');

        return Inertia::render('candidate/test-take', [
            'test' => $test,
            'application' => $application,
            'existingResult' => $existingResult,
        ]);
    }

    public function start(Test $test, Request $request)
    {
        $user = $request->user();
        $application = Application::whereHas('candidate', fn ($q) => $q->where('user_id', $user->id))
            ->latest('applied_at')
            ->first();

        $result = TestResult::firstOrCreate(
            [
                'application_id' => $application->id,
                'test_id' => $test->id,
            ],
            [
                'passing_score' => $test->passing_score,
                'started_at' => now(),
            ]
        );

        return back()->with('result_id', $result->id);
    }

    public function submit(Request $request, Test $test)
    {
        $user = $request->user();
        $application = Application::whereHas('candidate', fn ($q) => $q->where('user_id', $user->id))
            ->latest('applied_at')
            ->first();

        $validated = $request->validate([
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:rec_test_questions,id',
            'answers.*.answer' => 'required|string',
        ]);

        $result = TestResult::where('application_id', $application->id)
            ->where('test_id', $test->id)
            ->first();

        $totalScore = 0;
        $maxScore = 0;

        foreach ($validated['answers'] as $answerData) {
            $question = $test->questions()->find($answerData['question_id']);
            $isCorrect = strtolower(trim($answerData['answer'])) === strtolower(trim($question->correct_answer));
            $pointsEarned = $isCorrect ? $question->points : 0;
            $totalScore += $pointsEarned;
            $maxScore += $question->points;

            TestAnswer::updateOrCreate(
                [
                    'application_id' => $application->id,
                    'question_id' => $question->id,
                ],
                [
                    'answer_text' => $answerData['answer'],
                    'is_correct' => $isCorrect,
                    'points_earned' => $pointsEarned,
                ]
            );
        }

        $finalScore = $maxScore > 0 ? round(($totalScore / $maxScore) * 100, 2) : 0;

        $result->update([
            'total_score' => $finalScore,
            'is_passed' => $finalScore >= $test->passing_score,
            'completed_at' => now(),
        ]);

        $application->update(['status' => 'reviewing']);

        return redirect()->route('candidate.tests.index')
            ->with('success', 'Test berhasil diselesaikan. Nilai Anda: '.$finalScore);
    }

    public function status(Request $request)
    {
        $user = $request->user();
        $application = Application::with(['vacancy.region', 'vacancy.position', 'testResults.test'])
            ->whereHas('candidate', fn ($q) => $q->where('user_id', $user->id))
            ->latest('applied_at')
            ->first();

        return Inertia::render('candidate/application-status', [
            'application' => $application,
        ]);
    }
}

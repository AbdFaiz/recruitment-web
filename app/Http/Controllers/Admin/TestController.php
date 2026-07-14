<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Test;
use App\Models\TestQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestController extends Controller
{
    public function index(Request $request)
    {
        $tests = Test::withCount('questions')->latest()->paginate(15);

        return Inertia::render('admin/tests/index', ['tests' => $tests]);
    }

    public function create()
    {
        return Inertia::render('admin/tests/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'type' => 'required|in:psychotest,knowledge,technical,custom',
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer|min:1',
            'passing_score' => 'required|numeric|min:0|max:100',
            'is_active' => 'boolean',
        ]);

        $validated['created_by'] = $request->user()->id;
        Test::create($validated);

        return redirect()->route('admin.tests.index')->with('success', 'Test berhasil ditambahkan.');
    }

    public function edit(Test $test)
    {
        return Inertia::render('admin/tests/edit', ['test' => $test]);
    }

    public function update(Request $request, Test $test)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'type' => 'required|in:psychotest,knowledge,technical,custom',
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer|min:1',
            'passing_score' => 'required|numeric|min:0|max:100',
            'is_active' => 'boolean',
        ]);

        $validated['updated_by'] = $request->user()->id;
        $test->update($validated);

        return redirect()->route('admin.tests.index')->with('success', 'Test berhasil diperbarui.');
    }

    public function destroy(Test $test)
    {
        $test->delete();

        return redirect()->route('admin.tests.index')->with('success', 'Test berhasil dihapus.');
    }

    public function questions(Test $test)
    {
        $test->load('questions');

        return Inertia::render('admin/tests/questions', ['test' => $test]);
    }

    public function storeQuestion(Request $request, Test $test)
    {
        $validated = $request->validate([
            'question_text' => 'required|string',
            'type' => 'required|in:multiple_choice,true_false,essay',
            'options' => 'nullable|array',
            'correct_answer' => 'nullable|string|max:255',
            'points' => 'required|integer|min:1',
        ]);

        $maxOrder = $test->questions()->max('order') ?? 0;
        $validated['test_id'] = $test->id;
        $validated['order'] = $maxOrder + 1;

        TestQuestion::create($validated);

        return back()->with('success', 'Soal berhasil ditambahkan.');
    }

    public function updateQuestion(Request $request, Test $test, TestQuestion $question)
    {
        $validated = $request->validate([
            'question_text' => 'required|string',
            'type' => 'required|in:multiple_choice,true_false,essay',
            'options' => 'nullable|array',
            'correct_answer' => 'nullable|string|max:255',
            'points' => 'required|integer|min:1',
        ]);

        $question->update($validated);

        return back()->with('success', 'Soal berhasil diperbarui.');
    }

    public function destroyQuestion(Test $test, TestQuestion $question)
    {
        $question->delete();

        return back()->with('success', 'Soal berhasil dihapus.');
    }
}

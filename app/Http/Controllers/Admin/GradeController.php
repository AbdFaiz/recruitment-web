<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GradeController extends Controller
{
    public function index(Request $request)
    {
        $grades = Grade::latest()->paginate(15);

        return Inertia::render('admin/grades/index', ['grades' => $grades]);
    }

    public function create()
    {
        return Inertia::render('admin/grades/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:15|unique:org_grades,code',
            'name' => 'required|string|max:50',
            'profile' => 'nullable|string',
        ]);

        $validated['created_by'] = $request->user()->id;
        Grade::create($validated);

        return redirect()->route('admin.grades.index')->with('success', 'Grade berhasil ditambahkan.');
    }

    public function edit(Grade $grade)
    {
        return Inertia::render('admin/grades/edit', ['grade' => $grade]);
    }

    public function update(Request $request, Grade $grade)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:15|unique:org_grades,code,'.$grade->id,
            'name' => 'required|string|max:50',
            'status' => 'required|in:active,unactive',
            'profile' => 'nullable|string',
        ]);

        $validated['updated_by'] = $request->user()->id;
        $grade->update($validated);

        return redirect()->route('admin.grades.index')->with('success', 'Grade berhasil diperbarui.');
    }

    public function destroy(Grade $grade)
    {
        $grade->delete();

        return redirect()->route('admin.grades.index')->with('success', 'Grade berhasil dihapus.');
    }
}

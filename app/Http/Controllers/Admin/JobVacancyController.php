<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobVacancy;
use App\Models\Position;
use App\Models\Region;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobVacancyController extends Controller
{
    public function index(Request $request)
    {
        $vacancies = JobVacancy::with(['region', 'position'])->latest()->paginate(15);
        $regions = Region::where('status', 'active')->orderBy('name')->get();
        $positions = Position::where('status', 'active')->orderBy('positionname')->get();

        return Inertia::render('admin/vacancies/index', [
            'vacancies' => $vacancies, 'regions' => $regions, 'positions' => $positions,
        ]);
    }

    public function create()
    {
        $regions = Region::where('status', 'active')->orderBy('name')->get();
        $positions = Position::where('status', 'active')->orderBy('positionname')->get();

        return Inertia::render('admin/vacancies/create', ['regions' => $regions, 'positions' => $positions]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'region_id' => 'required|exists:org_regions,id',
            'position_id' => 'required|exists:org_positions,id',
            'title' => 'required|string|max:150',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'employment_type' => 'required|in:full_time,part_time,contract,internship',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0|gte:salary_min',
            'quota' => 'required|integer|min:1',
            'deadline' => 'required|date|after:today',
        ]);

        $validated['created_by'] = $request->user()->id;
        JobVacancy::create($validated);

        return redirect()->route('admin.vacancies.index')->with('success', 'Lowongan berhasil ditambahkan.');
    }

    public function edit(JobVacancy $vacancy)
    {
        $regions = Region::where('status', 'active')->orderBy('name')->get();
        $positions = Position::where('status', 'active')->orderBy('positionname')->get();

        return Inertia::render('admin/vacancies/edit', [
            'vacancy' => $vacancy, 'regions' => $regions, 'positions' => $positions,
        ]);
    }

    public function update(Request $request, JobVacancy $vacancy)
    {
        $validated = $request->validate([
            'region_id' => 'required|exists:org_regions,id',
            'position_id' => 'required|exists:org_positions,id',
            'title' => 'required|string|max:150',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'employment_type' => 'required|in:full_time,part_time,contract,internship',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0|gte:salary_min',
            'quota' => 'required|integer|min:1',
            'deadline' => 'required|date',
            'status' => 'required|in:open,closed',
        ]);

        $validated['updated_by'] = $request->user()->id;
        $vacancy->update($validated);

        return redirect()->route('admin.vacancies.index')->with('success', 'Lowongan berhasil diperbarui.');
    }

    public function destroy(JobVacancy $vacancy)
    {
        $vacancy->delete();

        return redirect()->route('admin.vacancies.index')->with('success', 'Lowongan berhasil dihapus.');
    }
}

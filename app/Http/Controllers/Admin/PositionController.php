<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Division;
use App\Models\Position;
use App\Models\Workunit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PositionController extends Controller
{
    public function index(Request $request)
    {
        $positions = Position::with(['company', 'division', 'workunit'])->latest()->paginate(15);
        $companies = Company::where('status', 'active')->orderBy('name')->get();
        $divisions = Division::where('status', 'active')->orderBy('deptname')->get();
        $workunits = Workunit::where('status', 'active')->orderBy('workunitname')->get();

        return Inertia::render('admin/positions/index', [
            'positions' => $positions, 'companies' => $companies,
            'divisions' => $divisions, 'workunits' => $workunits,
        ]);
    }

    public function create()
    {
        $companies = Company::where('status', 'active')->orderBy('name')->get();
        $divisions = Division::where('status', 'active')->orderBy('deptname')->get();
        $workunits = Workunit::where('status', 'active')->orderBy('workunitname')->get();

        return Inertia::render('admin/positions/create', [
            'companies' => $companies, 'divisions' => $divisions, 'workunits' => $workunits,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'positionid' => 'required|string|max:10',
            'positionname' => 'required|string|max:100',
            'companyid' => 'nullable|exists:org_companies,id',
            'divisionid' => 'nullable|exists:org_divisions,id',
            'workunitid' => 'nullable|exists:org_workunits,id',
            'profile' => 'nullable|string',
            'level' => 'nullable|string|max:50',
        ]);

        $validated['created_by'] = $request->user()->id;
        Position::create($validated);

        return redirect()->route('admin.positions.index')->with('success', 'Posisi berhasil ditambahkan.');
    }

    public function edit(Position $position)
    {
        $companies = Company::where('status', 'active')->orderBy('name')->get();
        $divisions = Division::where('status', 'active')->orderBy('deptname')->get();
        $workunits = Workunit::where('status', 'active')->orderBy('workunitname')->get();

        return Inertia::render('admin/positions/edit', [
            'position' => $position, 'companies' => $companies,
            'divisions' => $divisions, 'workunits' => $workunits,
        ]);
    }

    public function update(Request $request, Position $position)
    {
        $validated = $request->validate([
            'positionid' => 'required|string|max:10',
            'positionname' => 'required|string|max:100',
            'companyid' => 'nullable|exists:org_companies,id',
            'divisionid' => 'nullable|exists:org_divisions,id',
            'workunitid' => 'nullable|exists:org_workunits,id',
            'status' => 'required|in:active,unactive',
            'profile' => 'nullable|string',
            'level' => 'nullable|string|max:50',
        ]);

        $validated['updated_by'] = $request->user()->id;
        $position->update($validated);

        return redirect()->route('admin.positions.index')->with('success', 'Posisi berhasil diperbarui.');
    }

    public function destroy(Position $position)
    {
        $position->delete();

        return redirect()->route('admin.positions.index')->with('success', 'Posisi berhasil dihapus.');
    }
}

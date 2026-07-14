<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Division;
use App\Models\Workunit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkunitController extends Controller
{
    public function index(Request $request)
    {
        $workunits = Workunit::with(['company', 'division'])->latest()->paginate(15);
        $companies = Company::where('status', 'active')->orderBy('name')->get();
        $divisions = Division::where('status', 'active')->orderBy('deptname')->get();

        return Inertia::render('admin/workunits/index', ['workunits' => $workunits, 'companies' => $companies, 'divisions' => $divisions]);
    }

    public function create()
    {
        $companies = Company::where('status', 'active')->orderBy('name')->get();
        $divisions = Division::where('status', 'active')->orderBy('deptname')->get();

        return Inertia::render('admin/workunits/create', ['companies' => $companies, 'divisions' => $divisions]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'workunitid' => 'required|string|max:10',
            'workunitname' => 'required|string|max:50',
            'companyid' => 'nullable|exists:org_companies,id',
            'divisionid' => 'nullable|exists:org_divisions,id',
            'profile' => 'nullable|string',
        ]);

        $validated['created_by'] = $request->user()->id;
        Workunit::create($validated);

        return redirect()->route('admin.workunits.index')->with('success', 'Unit kerja berhasil ditambahkan.');
    }

    public function edit(Workunit $workunit)
    {
        $companies = Company::where('status', 'active')->orderBy('name')->get();
        $divisions = Division::where('status', 'active')->orderBy('deptname')->get();

        return Inertia::render('admin/workunits/edit', ['workunit' => $workunit, 'companies' => $companies, 'divisions' => $divisions]);
    }

    public function update(Request $request, Workunit $workunit)
    {
        $validated = $request->validate([
            'workunitid' => 'required|string|max:10',
            'workunitname' => 'required|string|max:50',
            'companyid' => 'nullable|exists:org_companies,id',
            'divisionid' => 'nullable|exists:org_divisions,id',
            'status' => 'required|in:active,unactive',
            'profile' => 'nullable|string',
        ]);

        $validated['updated_by'] = $request->user()->id;
        $workunit->update($validated);

        return redirect()->route('admin.workunits.index')->with('success', 'Unit kerja berhasil diperbarui.');
    }

    public function destroy(Workunit $workunit)
    {
        $workunit->delete();

        return redirect()->route('admin.workunits.index')->with('success', 'Unit kerja berhasil dihapus.');
    }
}

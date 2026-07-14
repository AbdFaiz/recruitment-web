<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Division;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DivisionController extends Controller
{
    public function index(Request $request)
    {
        $divisions = Division::with('company')->latest()->paginate(15);
        $companies = Company::where('status', 'active')->orderBy('name')->get();

        return Inertia::render('admin/divisions/index', ['divisions' => $divisions, 'companies' => $companies]);
    }

    public function create()
    {
        $companies = Company::where('status', 'active')->orderBy('name')->get();

        return Inertia::render('admin/divisions/create', ['companies' => $companies]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'deptid' => 'required|string|max:15|unique:org_divisions,deptid',
            'deptname' => 'required|string|max:100',
            'companyid' => 'nullable|exists:org_companies,id',
            'deptprofile' => 'nullable|string',
        ]);

        $validated['created_by'] = $request->user()->id;
        Division::create($validated);

        return redirect()->route('admin.divisions.index')->with('success', 'Divisi berhasil ditambahkan.');
    }

    public function edit(Division $division)
    {
        $companies = Company::where('status', 'active')->orderBy('name')->get();

        return Inertia::render('admin/divisions/edit', ['division' => $division, 'companies' => $companies]);
    }

    public function update(Request $request, Division $division)
    {
        $validated = $request->validate([
            'deptid' => 'required|string|max:15|unique:org_divisions,deptid,'.$division->id,
            'deptname' => 'required|string|max:100',
            'companyid' => 'nullable|exists:org_companies,id',
            'status' => 'required|in:active,unactive',
            'deptprofile' => 'nullable|string',
        ]);

        $validated['updated_by'] = $request->user()->id;
        $division->update($validated);

        return redirect()->route('admin.divisions.index')->with('success', 'Divisi berhasil diperbarui.');
    }

    public function destroy(Division $division)
    {
        $division->delete();

        return redirect()->route('admin.divisions.index')->with('success', 'Divisi berhasil dihapus.');
    }
}

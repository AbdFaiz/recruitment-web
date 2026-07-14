<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index(Request $request)
    {
        $companies = Company::latest()->paginate(15);

        return Inertia::render('admin/companies/index', ['companies' => $companies]);
    }

    public function create()
    {
        return Inertia::render('admin/companies/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:10|unique:org_companies,code',
            'name' => 'required|string|max:100',
            'slug' => 'required|string|max:100|unique:org_companies,slug',
            'address' => 'required|string',
            'city' => 'required|string|max:50',
            'province' => 'required|string|max:50',
            'postcode' => 'nullable|string|max:6',
            'phone' => 'required|string|max:30',
            'website' => 'nullable|string|max:100',
            'npwp' => 'nullable|string|max:30',
            'profile' => 'nullable|string',
            'name_account' => 'nullable|string|max:50',
            'no_account' => 'nullable|string|max:50',
        ]);

        $validated['created_by'] = $request->user()->id;
        Company::create($validated);

        return redirect()->route('admin.companies.index')->with('success', 'Perusahaan berhasil ditambahkan.');
    }

    public function edit(Company $company)
    {
        return Inertia::render('admin/companies/edit', ['company' => $company]);
    }

    public function update(Request $request, Company $company)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:10|unique:org_companies,code,'.$company->id,
            'name' => 'required|string|max:100',
            'slug' => 'required|string|max:100|unique:org_companies,slug,'.$company->id,
            'address' => 'required|string',
            'city' => 'required|string|max:50',
            'province' => 'required|string|max:50',
            'postcode' => 'nullable|string|max:6',
            'phone' => 'required|string|max:30',
            'website' => 'nullable|string|max:100',
            'npwp' => 'nullable|string|max:30',
            'profile' => 'nullable|string',
            'name_account' => 'nullable|string|max:50',
            'no_account' => 'nullable|string|max:50',
            'status' => 'required|in:active,unactive',
        ]);

        $validated['updated_by'] = $request->user()->id;
        $company->update($validated);

        return redirect()->route('admin.companies.index')->with('success', 'Perusahaan berhasil diperbarui.');
    }

    public function destroy(Company $company)
    {
        $company->delete();

        return redirect()->route('admin.companies.index')->with('success', 'Perusahaan berhasil dihapus.');
    }
}

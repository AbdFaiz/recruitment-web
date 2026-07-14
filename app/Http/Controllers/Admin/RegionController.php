<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Region;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegionController extends Controller
{
    public function index(Request $request)
    {
        $regions = Region::latest()->paginate(15);

        return Inertia::render('admin/regions/index', ['regions' => $regions]);
    }

    public function create()
    {
        return Inertia::render('admin/regions/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'regionid' => 'required|string|max:15|unique:org_regions,regionid',
            'name' => 'required|string|max:100',
            'slug' => 'required|string|max:100|unique:org_regions,slug',
            'address' => 'required|string',
            'city' => 'required|string|max:50',
            'province' => 'required|string|max:50',
            'postcode' => 'nullable|string|max:6',
            'phone' => 'nullable|string|max:30',
            'head_name' => 'nullable|string|max:100',
        ]);

        $validated['created_by'] = $request->user()->id;
        Region::create($validated);

        return redirect()->route('admin.regions.index')->with('success', 'Region berhasil ditambahkan.');
    }

    public function edit(Region $region)
    {
        return Inertia::render('admin/regions/edit', ['region' => $region]);
    }

    public function update(Request $request, Region $region)
    {
        $validated = $request->validate([
            'regionid' => 'required|string|max:15|unique:org_regions,regionid,'.$region->id,
            'name' => 'required|string|max:100',
            'slug' => 'required|string|max:100|unique:org_regions,slug,'.$region->id,
            'address' => 'required|string',
            'city' => 'required|string|max:50',
            'province' => 'required|string|max:50',
            'postcode' => 'nullable|string|max:6',
            'phone' => 'nullable|string|max:30',
            'head_name' => 'nullable|string|max:100',
            'status' => 'required|in:active,unactive',
        ]);

        $validated['updated_by'] = $request->user()->id;
        $region->update($validated);

        return redirect()->route('admin.regions.index')->with('success', 'Region berhasil diperbarui.');
    }

    public function destroy(Region $region)
    {
        $region->delete();

        return redirect()->route('admin.regions.index')->with('success', 'Region berhasil dihapus.');
    }
}

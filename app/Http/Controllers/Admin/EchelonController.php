<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Echelon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EchelonController extends Controller
{
    public function index(Request $request)
    {
        $echelons = Echelon::latest()->paginate(15);

        return Inertia::render('admin/echelons/index', ['echelons' => $echelons]);
    }

    public function create()
    {
        return Inertia::render('admin/echelons/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:15|unique:org_echelons,code',
            'name' => 'required|string|max:50',
            'profile' => 'nullable|string',
        ]);

        $validated['created_by'] = $request->user()->id;
        Echelon::create($validated);

        return redirect()->route('admin.echelons.index')->with('success', 'Echelon berhasil ditambahkan.');
    }

    public function edit(Echelon $echelon)
    {
        return Inertia::render('admin/echelons/edit', ['echelon' => $echelon]);
    }

    public function update(Request $request, Echelon $echelon)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:15|unique:org_echelons,code,'.$echelon->id,
            'name' => 'required|string|max:50',
            'status' => 'required|in:active,unactive',
            'profile' => 'nullable|string',
        ]);

        $validated['updated_by'] = $request->user()->id;
        $echelon->update($validated);

        return redirect()->route('admin.echelons.index')->with('success', 'Echelon berhasil diperbarui.');
    }

    public function destroy(Echelon $echelon)
    {
        $echelon->delete();

        return redirect()->route('admin.echelons.index')->with('success', 'Echelon berhasil dihapus.');
    }
}

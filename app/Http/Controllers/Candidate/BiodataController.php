<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Models\Candidate;
use App\Models\CandidateEducation;
use App\Models\CandidateExperience;
use App\Models\CandidateFamily;
use App\Models\RecNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BiodataController extends Controller
{
    public function edit(Request $request)
    {
        $user = $request->user();
        $candidate = Candidate::with(['educations', 'experiences', 'families'])
            ->where('user_id', $user->id)
            ->first();

        return Inertia::render('candidate/biodata', ['candidate' => $candidate]);
    }

    public function updatePersonal(Request $request)
    {
        $user = $request->user();

        $sanitized = $this->sanitizeEmptyStrings($request->all());

        $validated = $this->validate($request, [
            'nickname' => 'nullable|string|max:30',
            'citizenid' => 'nullable|string|max:30',
            'kkid' => 'nullable|string|max:30',
            'pob' => 'nullable|string|max:50',
            'dob' => 'nullable|date',
            'address1' => 'nullable|string',
            'province1' => 'nullable|string|max:50',
            'city1' => 'nullable|string|max:50',
            'postcode1' => 'nullable|integer',
            'address2' => 'nullable|string',
            'province2' => 'nullable|string|max:50',
            'city2' => 'nullable|string|max:50',
            'postcode2' => 'nullable|integer',
            'email_personal' => 'nullable|email|max:100',
            'gender' => 'nullable|in:male,female',
            'homephone' => 'nullable|string|max:30',
            'handphone' => 'nullable|string|max:30',
            'weight' => 'nullable|integer|min:0',
            'height' => 'nullable|integer|min:0',
            'bloodtype' => 'nullable|in:A,B,AB,O',
            'blindcolor' => 'nullable|boolean',
            'nationality' => 'nullable|string|max:50',
            'ethnic' => 'nullable|string|max:50',
            'religion' => 'nullable|string|max:30',
            'maritalid' => 'nullable|string|max:30',
            'numchilds' => 'nullable|integer|min:0',
            'location' => 'nullable|string|max:100',
            'typelicense1' => 'nullable|string|max:5',
            'drvlicense1' => 'nullable|string|max:30',
            'datelicense1' => 'nullable|date',
            'typelicense2' => 'nullable|string|max:5',
            'drvlicense2' => 'nullable|string|max:30',
            'datelicense2' => 'nullable|date',
            'photo' => 'nullable|image|max:2048',
            'cv_file' => 'nullable|file|max:5120',
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('candidates/photos', 'public');
        }
        if ($request->hasFile('cv_file')) {
            $validated['cv_file'] = $request->file('cv_file')->store('candidates/cv', 'public');
        }

        $candidate = Candidate::where('user_id', $user->id)->first();
        if ($candidate) {
            $candidate->update($validated);
        } else {
            $validated['user_id'] = $user->id;
            Candidate::create($validated);
        }

        return back()->with('success', 'Data pribadi berhasil disimpan.');
    }

    public function storeEducation(Request $request)
    {
        $validated = $request->validate([
            'level' => 'required|string|max:20',
            'faculty' => 'nullable|string|max:100',
            'major' => 'nullable|string|max:100',
            'institution_name' => 'required|string|max:150',
            'institution_address' => 'nullable|string',
            'graduation_year' => 'nullable|string|max:4',
            'gpa' => 'nullable|numeric|min:0|max:4',
        ]);

        $candidate = $this->getOrCreateCandidate($request);
        $validated['candidate_id'] = $candidate->id;
        CandidateEducation::create($validated);

        return back()->with('success', 'Pendidikan berhasil ditambahkan.');
    }

    public function updateEducation(Request $request, CandidateEducation $education)
    {
        $validated = $request->validate([
            'level' => 'required|string|max:20',
            'faculty' => 'nullable|string|max:100',
            'major' => 'nullable|string|max:100',
            'institution_name' => 'required|string|max:150',
            'institution_address' => 'nullable|string',
            'graduation_year' => 'nullable|string|max:4',
            'gpa' => 'nullable|numeric|min:0|max:4',
        ]);

        $education->update($validated);

        return back()->with('success', 'Pendidikan berhasil diperbarui.');
    }

    public function destroyEducation(CandidateEducation $education)
    {
        $education->delete();

        return back()->with('success', 'Pendidikan berhasil dihapus.');
    }

    public function storeExperience(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'nullable|string|max:100',
            'company_address' => 'nullable|string',
            'supervisor_phone' => 'nullable|string|max:30',
            'supervisor_name' => 'nullable|string|max:50',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'last_salary' => 'nullable|string|max:30',
            'reason_for_leaving' => 'nullable|string',
            'position' => 'nullable|string|max:50',
            'job_description' => 'nullable|string',
        ]);

        $candidate = $this->getOrCreateCandidate($request);
        $validated['candidate_id'] = $candidate->id;
        CandidateExperience::create($validated);

        return back()->with('success', 'Pengalaman kerja berhasil ditambahkan.');
    }

    public function updateExperience(Request $request, CandidateExperience $experience)
    {
        $validated = $request->validate([
            'company_name' => 'nullable|string|max:100',
            'company_address' => 'nullable|string',
            'supervisor_phone' => 'nullable|string|max:30',
            'supervisor_name' => 'nullable|string|max:50',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'last_salary' => 'nullable|string|max:30',
            'reason_for_leaving' => 'nullable|string',
            'position' => 'nullable|string|max:50',
            'job_description' => 'nullable|string',
        ]);

        $experience->update($validated);

        return back()->with('success', 'Pengalaman kerja berhasil diperbarui.');
    }

    public function destroyExperience(CandidateExperience $experience)
    {
        $experience->delete();

        return back()->with('success', 'Pengalaman kerja berhasil dihapus.');
    }

    public function storeFamily(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'relation_status' => 'required|string|max:30',
            'citizenid' => 'nullable|string|max:30',
            'address_ktp' => 'nullable|string',
            'address_domicile' => 'nullable|string',
            'gender' => 'nullable|in:male,female',
            'pob' => 'nullable|string|max:50',
            'dob' => 'nullable|date',
            'last_education' => 'nullable|string|max:30',
            'job' => 'nullable|string|max:100',
        ]);

        $candidate = $this->getOrCreateCandidate($request);
        $validated['candidate_id'] = $candidate->id;
        CandidateFamily::create($validated);

        return back()->with('success', 'Keluarga berhasil ditambahkan.');
    }

    public function updateFamily(Request $request, CandidateFamily $family)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'relation_status' => 'required|string|max:30',
            'citizenid' => 'nullable|string|max:30',
            'address_ktp' => 'nullable|string',
            'address_domicile' => 'nullable|string',
            'gender' => 'nullable|in:male,female',
            'pob' => 'nullable|string|max:50',
            'dob' => 'nullable|date',
            'last_education' => 'nullable|string|max:30',
            'job' => 'nullable|string|max:100',
        ]);

        $family->update($validated);

        return back()->with('success', 'Keluarga berhasil diperbarui.');
    }

    public function destroyFamily(CandidateFamily $family)
    {
        $family->delete();

        return back()->with('success', 'Keluarga berhasil dihapus.');
    }

    public function complete(Request $request)
    {
        $candidate = $this->getOrCreateCandidate($request);
        $candidate->update(['status' => 'complete']);

        RecNotification::create([
            'type' => 'biodata_complete',
            'title' => 'Biodata Kandidat Lengkap',
            'message' => 'Kandidat '.$request->user()->name.' telah melengkapi biodata.',
            'notifiable_id' => $candidate->id,
            'notifiable_type' => 'App\Models\Candidate',
            'data' => ['candidate_id' => $candidate->id, 'user_name' => $request->user()->name],
        ]);

        return back()->with('success', 'Biodata telah dilengkapi. HRD akan segera mereview.');
    }

    private function sanitizeEmptyStrings(array $data): array
    {
        return array_map(function ($value) {
            return $value === '' ? null : $value;
        }, $data);
    }

    private function getOrCreateCandidate(Request $request): Candidate
    {
        $candidate = Candidate::where('user_id', $request->user()->id)->first();
        if (! $candidate) {
            $candidate = Candidate::create(['user_id' => $request->user()->id, 'status' => 'incomplete']);
        }

        return $candidate;
    }
}

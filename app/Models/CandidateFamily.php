<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CandidateFamily extends Model
{
    protected $table = 'rec_candidate_families';

    protected $fillable = [
        'candidate_id', 'name', 'relation_status', 'citizenid',
        'address_ktp', 'address_domicile', 'gender', 'pob', 'dob',
        'last_education', 'job',
    ];

    protected function casts(): array
    {
        return ['dob' => 'date'];
    }

    public function candidate(): BelongsTo
    {
        return $this->belongsTo(Candidate::class, 'candidate_id');
    }
}

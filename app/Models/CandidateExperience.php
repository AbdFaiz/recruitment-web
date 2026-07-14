<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CandidateExperience extends Model
{
    protected $table = 'rec_candidate_experiences';

    protected $fillable = [
        'candidate_id', 'company_name', 'company_address', 'supervisor_phone',
        'supervisor_name', 'start_date', 'end_date', 'last_salary',
        'reason_for_leaving', 'position', 'job_description',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }

    public function candidate(): BelongsTo
    {
        return $this->belongsTo(Candidate::class, 'candidate_id');
    }
}

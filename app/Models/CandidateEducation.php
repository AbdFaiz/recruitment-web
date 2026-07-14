<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CandidateEducation extends Model
{
    protected $table = 'rec_candidate_educations';

    protected $fillable = [
        'candidate_id', 'level', 'faculty', 'major', 'institution_name',
        'institution_address', 'graduation_year', 'gpa',
    ];

    protected function casts(): array
    {
        return ['gpa' => 'decimal:2'];
    }

    public function candidate(): BelongsTo
    {
        return $this->belongsTo(Candidate::class, 'candidate_id');
    }
}

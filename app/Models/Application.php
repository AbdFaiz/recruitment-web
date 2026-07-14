<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Application extends Model
{
    use SoftDeletes;

    protected $table = 'rec_applications';

    protected $fillable = [
        'candidate_id', 'vacancy_id', 'status', 'notes', 'hr_notes', 'applied_at',
    ];

    protected function casts(): array
    {
        return [
            'applied_at' => 'datetime',
        ];
    }

    public function candidate(): BelongsTo
    {
        return $this->belongsTo(Candidate::class);
    }

    public function vacancy(): BelongsTo
    {
        return $this->belongsTo(JobVacancy::class, 'vacancy_id');
    }

    public function testAnswers(): HasMany
    {
        return $this->hasMany(TestAnswer::class, 'application_id');
    }

    public function testResults(): HasMany
    {
        return $this->hasMany(TestResult::class, 'application_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobVacancy extends Model
{
    use SoftDeletes;

    protected $table = 'rec_job_vacancies';

    protected $fillable = [
        'region_id', 'position_id', 'title', 'description', 'requirements',
        'employment_type', 'salary_min', 'salary_max', 'quota',
        'deadline', 'status', 'updated_by', 'created_by',
    ];

    protected function casts(): array
    {
        return [
            'salary_min' => 'decimal:2',
            'salary_max' => 'decimal:2',
            'deadline' => 'date',
            'quota' => 'integer',
        ];
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class, 'region_id');
    }

    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class, 'position_id');
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class, 'vacancy_id');
    }
}

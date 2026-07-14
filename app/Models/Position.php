<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Position extends Model
{
    use SoftDeletes;

    protected $table = 'org_positions';

    protected $fillable = [
        'positionid', 'positionname', 'companyid', 'divisionid',
        'workunitid', 'status', 'profile', 'parent_id', 'level',
        'updated_by', 'created_by',
    ];

    protected function casts(): array
    {
        return ['status' => 'string'];
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'companyid');
    }

    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class, 'divisionid');
    }

    public function workunit(): BelongsTo
    {
        return $this->belongsTo(Workunit::class, 'workunitid');
    }

    public function jobVacancies(): HasMany
    {
        return $this->hasMany(JobVacancy::class, 'position_id');
    }
}

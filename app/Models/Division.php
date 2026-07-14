<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Division extends Model
{
    use SoftDeletes;

    protected $table = 'org_divisions';

    protected $fillable = [
        'deptid', 'deptname', 'companyid', 'status', 'deptprofile',
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

    public function workunits(): HasMany
    {
        return $this->hasMany(Workunit::class, 'divisionid');
    }

    public function positions(): HasMany
    {
        return $this->hasMany(Position::class, 'divisionid');
    }
}

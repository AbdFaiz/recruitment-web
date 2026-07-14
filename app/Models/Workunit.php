<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Workunit extends Model
{
    use SoftDeletes;

    protected $table = 'org_workunits';

    protected $fillable = [
        'workunitid', 'workunitname', 'companyid', 'divisionid',
        'status', 'profile', 'updated_by', 'created_by',
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
}

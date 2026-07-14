<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class VisiMisi extends Model
{
    use SoftDeletes;

    protected $table = 'org_visimisies';

    protected $fillable = [
        'companyid', 'vision', 'mission', 'updated_by', 'created_by',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'companyid');
    }
}

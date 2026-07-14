<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Region extends Model
{
    use SoftDeletes;

    protected $table = 'org_regions';

    protected $fillable = [
        'regionid', 'name', 'slug', 'address', 'city', 'province',
        'postcode', 'phone', 'head_name', 'status', 'updated_by', 'created_by',
    ];

    protected function casts(): array
    {
        return ['status' => 'string'];
    }

    public function jobVacancies(): HasMany
    {
        return $this->hasMany(JobVacancy::class, 'region_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use SoftDeletes;

    protected $table = 'org_companies';

    protected $fillable = [
        'code', 'name', 'slug', 'address', 'city', 'province',
        'postcode', 'phone', 'website', 'npwp', 'profile',
        'name_account', 'no_account', 'status', 'updated_by', 'created_by',
    ];

    protected function casts(): array
    {
        return ['status' => 'string'];
    }

    public function divisions(): HasMany
    {
        return $this->hasMany(Division::class, 'companyid');
    }

    public function positions(): HasMany
    {
        return $this->hasMany(Position::class, 'companyid');
    }

    public function workunits(): HasMany
    {
        return $this->hasMany(Workunit::class, 'companyid');
    }

    public function visimisies(): HasMany
    {
        return $this->hasMany(VisiMisi::class, 'companyid');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Grade extends Model
{
    use SoftDeletes;

    protected $table = 'org_grades';

    protected $fillable = [
        'code', 'name', 'status', 'profile', 'updated_by', 'created_by',
    ];

    protected function casts(): array
    {
        return ['status' => 'string'];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Test extends Model
{
    use SoftDeletes;

    protected $table = 'rec_tests';

    protected $fillable = [
        'title', 'type', 'description', 'duration_minutes',
        'passing_score', 'is_active', 'updated_by', 'created_by',
    ];

    protected function casts(): array
    {
        return [
            'duration_minutes' => 'integer',
            'passing_score' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function questions(): HasMany
    {
        return $this->hasMany(TestQuestion::class, 'test_id');
    }

    public function results(): HasMany
    {
        return $this->hasMany(TestResult::class, 'test_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TestResult extends Model
{
    protected $table = 'rec_test_results';

    protected $fillable = [
        'application_id', 'test_id', 'total_score', 'passing_score',
        'is_passed', 'started_at', 'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'total_score' => 'decimal:2',
            'passing_score' => 'decimal:2',
            'is_passed' => 'boolean',
            'started_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    public function application(): BelongsTo
    {
        return $this->belongsTo(Application::class, 'application_id');
    }

    public function test(): BelongsTo
    {
        return $this->belongsTo(Test::class, 'test_id');
    }
}

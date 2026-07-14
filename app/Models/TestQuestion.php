<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TestQuestion extends Model
{
    protected $table = 'rec_test_questions';

    protected $fillable = [
        'test_id', 'question_text', 'type', 'options',
        'correct_answer', 'order', 'points',
    ];

    protected function casts(): array
    {
        return [
            'options' => 'array',
            'order' => 'integer',
            'points' => 'integer',
        ];
    }

    public function test(): BelongsTo
    {
        return $this->belongsTo(Test::class, 'test_id');
    }
}

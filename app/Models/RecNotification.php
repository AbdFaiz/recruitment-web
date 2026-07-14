<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecNotification extends Model
{
    protected $table = 'rec_notifications';

    protected $fillable = [
        'type', 'title', 'message', 'notifiable_id',
        'notifiable_type', 'data', 'read_at',
    ];

    protected function casts(): array
    {
        return [
            'data' => 'array',
            'read_at' => 'datetime',
        ];
    }

    public function markAsRead(): void
    {
        $this->update(['read_at' => now()]);
    }

    public function isRead(): bool
    {
        return $this->read_at !== null;
    }

    public function scopeUnread($query)
    {
        return $query->whereNull('read_at');
    }
}

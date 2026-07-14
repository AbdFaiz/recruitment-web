<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rec_notifications', function (Blueprint $table) {
            $table->id();
            $table->string('type', 50);
            $table->string('title', 150);
            $table->text('message');
            $table->unsignedBigInteger('notifiable_id')->nullable();
            $table->string('notifiable_type', 100)->nullable();
            $table->json('data')->nullable();
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rec_notifications');
    }
};

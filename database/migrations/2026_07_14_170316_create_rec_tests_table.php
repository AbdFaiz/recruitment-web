<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rec_tests', function (Blueprint $table) {
            $table->id();
            $table->string('title', 150);
            $table->enum('type', ['psychotest', 'knowledge', 'technical', 'custom'])->default('custom');
            $table->text('description')->nullable();
            $table->integer('duration_minutes')->default(60);
            $table->decimal('passing_score', 5, 2)->default(60);
            $table->boolean('is_active')->default(true);
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rec_tests');
    }
};

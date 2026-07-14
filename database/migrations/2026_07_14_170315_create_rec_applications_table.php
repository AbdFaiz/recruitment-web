<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rec_applications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('candidate_id');
            $table->foreign('candidate_id')->references('id')->on('rec_candidates')->onDelete('cascade');
            $table->unsignedBigInteger('vacancy_id');
            $table->foreign('vacancy_id')->references('id')->on('rec_job_vacancies')->onDelete('cascade');
            $table->enum('status', ['submitted', 'reviewing', 'testing', 'interview', 'offered', 'accepted', 'rejected'])->default('submitted');
            $table->text('notes')->nullable();
            $table->string('hr_notes')->nullable();
            $table->timestamp('applied_at');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rec_applications');
    }
};

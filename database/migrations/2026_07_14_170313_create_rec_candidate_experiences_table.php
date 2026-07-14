<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rec_candidate_experiences', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('candidate_id');
            $table->foreign('candidate_id')->references('id')->on('rec_candidates')->onDelete('cascade');
            $table->string('company_name', 100)->nullable();
            $table->text('company_address')->nullable();
            $table->string('supervisor_phone', 30)->nullable();
            $table->string('supervisor_name', 50)->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('last_salary', 30)->nullable();
            $table->text('reason_for_leaving')->nullable();
            $table->string('position', 50)->nullable();
            $table->text('job_description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rec_candidate_experiences');
    }
};

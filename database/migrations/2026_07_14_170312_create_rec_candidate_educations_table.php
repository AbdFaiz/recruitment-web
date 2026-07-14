<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rec_candidate_educations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('candidate_id');
            $table->foreign('candidate_id')->references('id')->on('rec_candidates')->onDelete('cascade');
            $table->string('level', 20)->comment('SD/SMP/SMA/D3/S1/S2/S3');
            $table->string('faculty', 100)->nullable()->comment('Fakultas');
            $table->string('major', 100)->nullable()->comment('Jurusan');
            $table->string('institution_name', 150)->comment('Nama Institusi');
            $table->text('institution_address')->nullable()->comment('Alamat Institusi');
            $table->string('graduation_year', 4)->nullable()->comment('Tahun Lulus');
            $table->decimal('gpa', 5, 2)->nullable()->comment('IPK/NA');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rec_candidate_educations');
    }
};

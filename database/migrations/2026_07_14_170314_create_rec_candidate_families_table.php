<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rec_candidate_families', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('candidate_id');
            $table->foreign('candidate_id')->references('id')->on('rec_candidates')->onDelete('cascade');
            $table->string('name', 100)->comment('Nama');
            $table->string('relation_status', 30)->comment('Istri/Suami/Anak/Ayah/Ibu dll');
            $table->string('citizenid', 30)->nullable()->comment('NIK');
            $table->text('address_ktp')->nullable()->comment('Alamat KTP');
            $table->text('address_domicile')->nullable()->comment('Alamat Domisili');
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->string('pob', 50)->nullable()->comment('Tempat Lahir');
            $table->date('dob')->nullable()->comment('Tanggal Lahir');
            $table->string('last_education', 30)->nullable()->comment('Pendidikan Terakhir');
            $table->string('job', 100)->nullable()->comment('Pekerjaan');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rec_candidate_families');
    }
};

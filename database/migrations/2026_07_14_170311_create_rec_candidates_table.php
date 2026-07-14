<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rec_candidates', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // Org references (mirroring tmp_emp_recruitments)
            $table->unsignedBigInteger('region_id')->nullable();
            $table->foreign('region_id')->references('id')->on('org_regions')->onDelete('set null');
            $table->unsignedBigInteger('position_id')->nullable();
            $table->foreign('position_id')->references('id')->on('org_positions')->onDelete('set null');
            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('org_companies')->onDelete('set null');
            $table->unsignedBigInteger('division_id')->nullable();
            $table->foreign('division_id')->references('id')->on('org_divisions')->onDelete('set null');
            $table->unsignedBigInteger('workunit_id')->nullable();
            $table->foreign('workunit_id')->references('id')->on('org_workunits')->onDelete('set null');
            $table->unsignedBigInteger('echelon_id')->nullable();
            $table->foreign('echelon_id')->references('id')->on('org_echelons')->onDelete('set null');
            $table->unsignedBigInteger('grade_id')->nullable();
            $table->foreign('grade_id')->references('id')->on('org_grades')->onDelete('set null');
            $table->string('location', 50)->nullable();

            // Personal data (mirroring tmp_emp_personal_recruitments)
            $table->string('nickname', 30)->nullable();
            $table->string('citizenid', 30)->nullable()->comment('NIK');
            $table->string('kkid', 30)->nullable()->comment('No KK');
            $table->string('pob', 50)->nullable()->comment('Tempat Lahir');
            $table->date('dob')->nullable()->comment('Tanggal Lahir');
            $table->text('address1')->nullable()->comment('Alamat KTP');
            $table->string('province1', 50)->nullable();
            $table->string('city1', 50)->nullable();
            $table->integer('postcode1')->nullable();
            $table->text('address2')->nullable()->comment('Alamat Domisili');
            $table->string('province2', 50)->nullable();
            $table->string('city2', 50)->nullable();
            $table->integer('postcode2')->nullable();
            $table->string('email_personal', 100)->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->string('homephone', 30)->nullable();
            $table->string('handphone', 30)->nullable();
            $table->integer('weight')->nullable()->comment('Berat badan (kg)');
            $table->integer('height')->nullable()->comment('Tinggi badan (cm)');
            $table->enum('bloodtype', ['A', 'B', 'AB', 'O'])->nullable();
            $table->boolean('blindcolor')->default(false)->comment('Buta warna');
            $table->string('nationality', 50)->nullable()->comment('Kewarganegaraan');
            $table->string('ethnic', 50)->nullable()->comment('Suku');
            $table->string('religion', 30)->nullable()->comment('Agama');
            $table->string('maritalid', 30)->nullable()->comment('Status Kawin');
            $table->integer('numchilds')->nullable()->comment('Jumlah Anak');
            $table->string('typelicense1', 5)->nullable()->comment('Jenis SIM 1');
            $table->string('drvlicense1', 30)->nullable()->comment('No SIM 1');
            $table->date('datelicense1')->nullable()->comment('Berlaku SIM 1');
            $table->string('typelicense2', 5)->nullable()->comment('Jenis SIM 2');
            $table->string('drvlicense2', 30)->nullable()->comment('No SIM 2');
            $table->date('datelicense2')->nullable()->comment('Berlaku SIM 2');

            // Files
            $table->string('photo', 255)->nullable();
            $table->string('cv_file', 255)->nullable();

            // Status
            $table->enum('status', ['incomplete', 'complete'])->default('incomplete');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rec_candidates');
    }
};

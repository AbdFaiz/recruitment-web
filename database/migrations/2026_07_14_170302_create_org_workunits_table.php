<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('org_workunits', function (Blueprint $table) {
            $table->id();
            $table->string('workunitid', 10);
            $table->string('workunitname', 50);
            $table->unsignedBigInteger('companyid')->nullable();
            $table->foreign('companyid')->references('id')->on('org_companies')->onDelete('set null');
            $table->unsignedBigInteger('divisionid')->nullable();
            $table->foreign('divisionid')->references('id')->on('org_divisions')->onDelete('set null');
            $table->enum('status', ['active', 'unactive'])->default('active');
            $table->text('profile')->nullable();
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
        Schema::dropIfExists('org_workunits');
    }
};

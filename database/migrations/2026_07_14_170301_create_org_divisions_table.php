<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('org_divisions', function (Blueprint $table) {
            $table->id();
            $table->string('deptid', 15)->unique();
            $table->string('deptname', 100);
            $table->unsignedBigInteger('companyid')->nullable();
            $table->foreign('companyid')->references('id')->on('org_companies')->onDelete('set null');
            $table->enum('status', ['active', 'unactive'])->default('active');
            $table->text('deptprofile')->nullable();
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
        Schema::dropIfExists('org_divisions');
    }
};

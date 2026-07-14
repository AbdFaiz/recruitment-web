<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('org_companies', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10)->unique();
            $table->string('name', 100);
            $table->string('slug', 100);
            $table->text('address');
            $table->string('city', 50);
            $table->string('province', 50);
            $table->string('postcode', 6)->nullable();
            $table->string('phone', 30);
            $table->string('website', 100)->nullable();
            $table->string('npwp', 30)->nullable();
            $table->text('profile')->nullable();
            $table->string('name_account', 50)->nullable();
            $table->string('no_account', 50)->nullable();
            $table->enum('status', ['active', 'unactive'])->default('active');
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
        Schema::dropIfExists('org_companies');
    }
};

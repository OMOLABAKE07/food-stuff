<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            // Change price columns from unsignedBigInteger to decimal for proper Naira storage
            $table->decimal('price', 10, 2)->change();
            $table->decimal('total', 10, 2)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            // Revert to unsignedBigInteger
            $table->unsignedBigInteger('price')->change();
            $table->unsignedBigInteger('total')->change();
        });
    }
};
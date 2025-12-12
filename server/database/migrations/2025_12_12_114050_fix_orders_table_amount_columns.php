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
        Schema::table('orders', function (Blueprint $table) {
            // Change amount columns from unsignedBigInteger to decimal for proper Naira storage
            $table->decimal('subtotal', 10, 2)->change();
            $table->decimal('tax', 10, 2)->change();
            $table->decimal('shipping', 10, 2)->change();
            $table->decimal('total', 10, 2)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Revert to unsignedBigInteger
            $table->unsignedBigInteger('subtotal')->change();
            $table->unsignedBigInteger('tax')->change();
            $table->unsignedBigInteger('shipping')->change();
            $table->unsignedBigInteger('total')->change();
        });
    }
};
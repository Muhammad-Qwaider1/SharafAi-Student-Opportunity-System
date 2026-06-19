<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('option_stream_weights', function (Blueprint $table) {
            $table->id();
            $table->foreignId('option_id')->constrained()->cascadeOnDelete();
            $table->enum('stream', [
                'engineering',
                'medical',
                'business',
                'arts',
                'humanities'
            ]);
            $table->integer('weight')->default(0);
            $table->timestamps();
            $table->unique(['option_id', 'stream']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('option_stream_weights');
    }
};
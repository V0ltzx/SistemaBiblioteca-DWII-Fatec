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
        Schema::create('livros', function (Blueprint $table) {
            $table->id('livro_id');
            $table->string('titulo');
            $table->string('isbn');
            $table->string('capa')->nullable();
            $table->text('sinopse')->nullable();
            $table->year('ano_publicacao')->nullable();
            $table->string('genero')->nullable();
            $table->foreignId('autor_id')
                ->constrained('autors', 'autor_id')
                ->onDelete('cascade');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livros');
    }
};

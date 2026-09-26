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
        Schema::create('emprestimos', function (Blueprint $table) {
            $table->id('emprestimo_id');
            $table->date('data_emprestimo')->nullable();
            $table->date('data_devolucao')->nullable();
            $table->string('status')->nullable();
            $table->foreignId('livro_id')
                ->constrained('livros', 'livro_id')
                ->onDelete('cascade');
            $table->foreignId('usuario_id')
                ->constrained('usuarios', 'usuario_id')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emprestimos');
    }
};

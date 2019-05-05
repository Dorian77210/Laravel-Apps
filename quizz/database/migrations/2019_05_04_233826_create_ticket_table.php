<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTicketTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ticket', function (Blueprint $table) {
            $table->increments( 'ticket_ID' );
            $table->timestamp( 'created_at' )->useCurrent();
            $table->timestamp( 'updated_at' )->useCurrent();
            $table->string( 'ticket', 100 )->unique();
            $table->unsignedInteger( 'quizz_ID' );

            $table->foreign( 'quizz_ID' )
                  ->references( 'quizz_ID' )
                  ->on( 'quizz' )
                  ->onDelete( 'cascade' );

            $table->boolean( 'is_already_used' )->default( false );
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists( 'ticket' );
    }
}

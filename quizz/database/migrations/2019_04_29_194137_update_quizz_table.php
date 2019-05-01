<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateQuizzTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table( 'quizz', function( Blueprint $table ) {
            $table->boolean( 'is_private' )->default( false );
            $table->boolean( 'is_active' )->default( true );
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table( 'quizz', function( Blueprint $table ) {
            $table->dropColumn( 'is_private' );
            $table->dropColumn( 'is_active' );
        } );
    }
}

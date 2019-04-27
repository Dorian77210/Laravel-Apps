<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuizzTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quizz', function (Blueprint $table) {
            $table->bigIncrements( 'quizz_ID' );

            $table->string( 'user_login', 100 );
            $table->foreign( 'user_login' )
                  ->references( 'login' )
                  ->on( 'quizz_user' )
                  ->onDelete( 'cascade' );

            $table->string( 'title', 100 );
            $table->text( 'resume' );
            $table->timestamp( 'created_at' )->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quizz');
    }
}
?>

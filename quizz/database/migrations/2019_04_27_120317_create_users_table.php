<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

use Carbon\Carbon;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string( 'login', 100 );
            $table->primary( 'login' );

            $table->string( 'lastname', 100 );
            $table->string( 'firstname', 100 );

            $table->string( 'email', 100 );
            $table->unique( 'email' );

            $table->timestamp( 'create_at' )->useCurrent();

            $table->string( 'password', 256 );
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}

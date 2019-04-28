<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\User as User;
use App\Model\Quizz;
use Illuminate\Database\QueryException;

use JWTAuth;
use JWTAuthException;

class QuizzController extends Controller {

    public function index() {

    }

    public function create() {

    }

    public function quizzes(Request $request) {
        $a = 10;

        $user = $request->session()->get( 'user' );
        $login = $user[ 'login' ];

        //retrieve the quizzes
        $quizzes = Quizz::where( 'user_login', $login )->get();

        $json = [];
        $json[ 'data' ] = [];

        $quizzes->each( function( $quizz, $key ) use( $json ) {

        });

        return response()->json( $json );
    }

    public function show($id) {

    }

    public function edit($id) {

    }

    public function update(Request $request, $id) {

    }

    public function destroy($id) {

    }

}

?>

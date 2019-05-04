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

    public function store(Request $request) {
        $user = $request->session()->get( 'user' );
        $login = $user[ 'login' ];

        // retrieve information about the quizz
        $title = $request->title;
        $resume = $request->resume || " ";
        $isPrivate = $request->isPrivate || " ";
        $isActive = $request->isActive;

        $quizz = new Quizz;
        $quizz->title = $title;
        $quizz->resume = $resume;
        $quizz->is_private = $isPrivate;
        $quizz->is_active = $isActive;
        $quizz->user_login = $login;

        $quizz->save();

        try {
            $quizz = $quizz->fresh();
        } catch(\Illuminate\Database\QueryException $exception) {
            $errorInfo = $exception->errorInfo;
            $a = 0;
        }
        // refresh model

        $json = [
            'success'       =>          true,
            'quizz_ID'      =>          $quizz->quizz_ID,
            'title'         =>          'Quizz created !',
            'content'       =>          'Your quizz is created ! Now, you can create your questions and answers !'
        ];

        return response()->json( $json );

    }

    public function quizzes(Request $request) {
        $user = $request->session()->get( 'user' );
        $login = $user[ 'login' ];

        //retrieve the quizzes
        $quizzes = Quizz::where( 'user_login', $login )->get();

        $data = [];

        foreach( $quizzes as $quizz ) {
            $jsonQuizz = [
                'title'      =>          $quizz->title,
                'created_at' =>          $quizz->created_at->format('Y-m-d'),
                'is_private' =>          $quizz->is_private == 1 ? true : false,
                'is_active'  =>          $quizz->is_active == 1 ? true : false,
                'quizz_ID'   =>          $quizz->quizz_ID
            ];

            array_push( $data, $jsonQuizz );
        }

        return response()->json( [ 'quizzes' => $data ] );
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

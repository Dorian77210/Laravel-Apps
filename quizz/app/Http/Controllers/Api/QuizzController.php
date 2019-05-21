<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\User as User;
use App\Model\Quizz;
use App\Model\Question;
use App\Model\Answer;
use Illuminate\Database\QueryException;

use JWTAuth;
use JWTAuthException;
use DB;

class QuizzController extends Controller {

    public function index() {

    }

    public function store(Request $request) {
        $user = $request->session()->get( 'user' );
        $login = $user[ 'login' ];

        // retrieve information about the quizz
        $dataQuizz = $request->data;
        $questions = $request->questions;

        $title = $dataQuizz[ 'title' ];
        $resume = $dataQuizz[ 'resume' ];
        $isPrivate = $dataQuizz[ 'isPrivate' ];
        $isActive = $dataQuizz[ 'isActive' ];

        DB::beginTransaction();
        try {
            $quizz = new Quizz;
            $quizz->title = $title;
            $quizz->resume = $resume;
            $quizz->is_private = $isPrivate;
            $quizz->is_active = $isActive;
            $quizz->user_login = $login;

            $quizz->save();
            $quizz->fresh();
            $quizzID = $quizz->quizz_ID;

            $numQuestion = 1;

            foreach( $questions as $question ) {
                $answers = $question[ 'answers' ];
                if( !$this->hasOneRightAnswer( $question ) ) {
                    $json = [
                        'success'       =>          false,
                        'title'         =>          'Problem with right answer',
                        'content'       =>          'The question number ' . $numQuestion . ' has a problem with right answers. Please check you have only one right answer'
                    ];

                    return response()->json( $json );
                }

                $questionDB = new Question;
                $questionDB->content = $question[ 'content' ];
                $questionDB->quizz_ID = $quizzID;
                $questionDB->save();
                $questionDB->fresh();

                $questionID = $questionDB->question_ID;

                foreach( $answers as $answer ) {
                    $answerDB = new Answer;
                    $answerDB->is_right_answer = $answer[ 'isRightAnswer' ];
                    $answerDB->content = $answer[ 'content' ];
                    $answerDB->question_ID = $questionID;
                    $answerDB->save();
                }

                $numQuestion++;
            }

            DB::commit();

        } catch( \Exception $e) {
            DB::rollback();
            $json = [
                'success'           =>      false,
                'title'             =>      'Server error',
                'content'           =>      'Something was wrong. Please retry later.'
            ];

            return response()->json( $json );
        }

        $json = [
            'success'               =>          true,
            'title'                 =>          'Creation of quizz',
            'content'               =>          'Quizz created with success.'
        ];
        return response()->json( $json );

    }

    // verify if a question has one AND only one right answer
    private function hasOneRightAnswer( $question ) {
        $answers = $question[ 'answers' ];
        $count = 0;

        foreach( $answers as $answer ) {
            if( $answer[ 'isRightAnswer' ] ) {
                $count++;
            }
        }

        return $count === 1;
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

    public function quizzInformation( Request $request ) {
        $user = $request->session()->get( 'user' );
        $sessionLogin = $user[ 'login' ];

        $requestLogin = $request->login;
        $quizzID = $request->quizz_ID;
        $json = null;

        // prevent the violation of information
        if( $sessionLogin != $requestLogin ) {
            $json = [
                'success'           =>          false,
                'message'           =>          'You try to access to prohibited information',
                'title'             =>          'Rights violation'
            ];

            return response()->json( $json, 203 );
        }

        $quizz = Quizz::where( 'quizz_ID', $quizzID )->first();

        $questionsJSON = [];
        $answersJSON = null;

        $questions = $quizz->questions;
        foreach( $questions as $question ) {
            $answersJSON = [];
            $answers = $question->answers;

            foreach( $answers as $answer ) {
                array_push( $answersJSON, [
                    'answerID'          =>          $answer->answer_ID,
                    'content'           =>          $answer->content,
                    'isRightAnswer'     =>          $answer->isRightAnswer,
                    'isDirty'           =>          false,
                    'isNew'             =>          false
                ] );
            }

            array_push( $questionsJSON, [
                'questionID'            =>          $question->question_ID,
                'content'               =>          $question->content,
                'isNew'                 =>          false,
                'isDirty'               =>          false,
                'answers'               =>          $answersJSON,
            ] );
        }

        $quizzJSON[ 'questions' ] = $questionsJSON;
        $quizzJSON[ 'data' ] = [
            'quizzID'       =>          $quizzID,
            'title'         =>          $quizz->title,
            'resume'        =>          $quizz->resume,
            'isPrivate'     =>          $quizz->is_private,
            'isActive'      =>          $quizz->is_active,
            'isDirty'       =>          false,
            'isNew'         =>          false
        ];

        $json = [
            'quizz'              =>          $quizzJSON,
            'success'            =>          true
        ];

        return response()->json( $json, 200 );
    }

    public function show($id) {

    }

    public function edit($id) {

    }

    public function update(Request $request, $id) {
        $id = intval( $id );
        $quizz = Quizz::where( 'quizz_ID', $id )->first();

        $quizz->title = $request->title;
        $quizz->resume = $request->resume;
        $quizz->is_private = $request->isPrivate;
        $quizz->is_active = $request->isActive;

        $quizz->save();

        $json = [
            'success'           =>          true,
            'title'             =>          'Quizz update',
            'content'           =>          'Your quizz has been saved with success.'
        ];

        return response()->json( $json );
    }

    public function destroy($id) {

    }

}

?>

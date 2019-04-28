<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\User as User;
use Illuminate\Database\QueryException;

use JWTAuth;
use JWTAuthException;

class UserController extends Controller {

    public function index() {

    }

    public function create() {

    }

    public function store(Request $request) {
        $json = [];

        // find if the login already exists

        $login = $request->login;
        $email = $request->email;

        $user = User::where( 'login', $login )->first();
        if($user) {
            $json = [
                'title'         =>          'Creation failed',
                'message'       =>          'The login ' . $login . ' is already used.'
            ];

            return response()->json( $json );
        }

        // find if the email is already exist
        $user = User::where( 'email', $email )->first();
        if($user) {
            $json = [
                'title'         =>          'Creation failed',
                'message'       =>          'The email ' . $email . ' is already used.'
            ];

            return response()->json( $json );
        }

        $user = new User;
        $user->login = $login;
        $user->lastname = $request->lastName;
        $user->password = Hash::make( $request->password );
        $user->firstname = $request->firstName;
        $user->email = $email;
        $user->auth_token = "";
        $user->save();

        $json = [
            'title'             =>          'Account created',
            'message'           =>          'Account created with success !'
        ];

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

    private function getToken($email, $password) {
        $token = null;
        $json = [];

        try {
            if(!$token = JWTAuth::attempt( [ 'email' => $email, 'password' => $password])) {
                $json = [
                    'response' => 'error',
                    'message' => 'Password or email invalid',
                    'token' => $token
                ];

                return response()->json( $json );
            }
        } catch(JWTAuthException $exception) {
            $json = [
                'response' => 'error',
                'message' => 'Token creation failed'
            ];

            return response()->json( $json );
        }

        return $token;
    }

    public function login(Request $request) {
        $id = $request->id;
        $password = $request->password;
        $user = User::where( 'email', $id )
                    ->orWhere( 'login', $id )
                    ->first();
        $json = null;

        if( $user && Hash::check( $password, $user->password)) {
            $token = self::getToken($user->email, $password );
            $user->auth_token = $token;
            $user->save();
            $json = [
                'success'       =>      true,
                'user'          =>      [
                        'login'     =>      $user->login,
                        'email'     =>      $user->email,
                        'firstname' =>      $user->firstname,
                        'lastname'  =>      $user->lastname,
                        'token'     =>      $user->auth_token
                    ]
                ];
        } else {
            $json = [
                'success'       =>      false,
                'title'         =>      'Auth failed',
                'message'       =>      'The login/email or the password is wrong. Please check your credentials.'
            ];
        }

        return response()->json( $json, 201 );
    }

}

?>

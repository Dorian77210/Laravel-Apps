<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Model\User as User;
use Illuminate\Database\QueryException;

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
}

?>

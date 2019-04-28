<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\User as User;
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

        return response()->json( [ 'success' => true ] );
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

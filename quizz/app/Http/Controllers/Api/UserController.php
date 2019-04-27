<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Model\User;

class UserController extends Controller {

    public function index() {

    }

    public function create() {

    }

    public function store(Request $request) {
        $json = [];
        // check if the login is a unique login
        $a = 1;

        return response()->json([
            'yo' => 'to'
        ]);
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

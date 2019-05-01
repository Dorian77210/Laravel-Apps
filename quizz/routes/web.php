<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group( [ 'middleware' => [ 'jwt-auth', 'api-header' ] ], function() {
    // route to be protected by the session connection

    //logout
    Route::post( '/user/logout/', 'Api\UserController@logout' );

    // quizzes
    Route::get( '/user/quizzes/', 'Api\QuizzController@quizzes' );
});

Route::get('/', function () {
    return view('welcome');
});

Route::group( [ 'middleware' => 'api-header' ], function() {
    Route::post( '/sign-in', 'Api\UserController@login' );
    Route::post( '/sign-up', 'Api\UserController@store');
});

Route::get('/{path}', function() {
    return view('welcome');
})->where( 'path', '.*' );


?>

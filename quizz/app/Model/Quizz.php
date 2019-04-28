<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Quizz extends Model {

    protected $table = 'quizz';

    protected $fillable = [
        'user_login', 'title', 'resume'
    ];

    public function user() {
        return $this->belongsTo( 'App\User', 'login', 'user_login' );
    }
}

?>

<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Quizz extends Model {

    protected $table = 'quizz';

    protected $fillable = [
        'title', 'resume', 'is_active', 'is_private', 'user_login'
    ];

    protected $primaryKey = 'quizz_ID';

    public function user() {
        return $this->belongsTo( 'App\User', 'login', 'user_login' );
    }
}

?>

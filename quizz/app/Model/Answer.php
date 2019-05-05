<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model {

    protected $table = 'answer';

    protected $primaryKey = 'answer_ID';

    protected $fillable = [
        'question_ID', 'content', 'is_right_answer'
    ];

    public function question() {
        return $this->belongsTo( 'App\Model\Question', 'question_ID' );
    }
}

?>

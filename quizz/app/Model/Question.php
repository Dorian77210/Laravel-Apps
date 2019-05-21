<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Question extends Model {

    protected $table = 'question';

    protected $fillable = [
        'quizz_ID', 'content'
    ];

    protected $primaryKey = 'question_ID';

    public function quizz() {
        return $this->belongsTo( 'App\Model\Quizz', 'quizz_ID' );
    }

    public function answers() {
        return $this->hasMany( 'App\Model\Answer', 'question_ID' );
    }

    public function toJSONFormat() {
        $json = [
            'questionID'            =>          $this->question_ID,
            'content'               =>          $this->content,
            'isNew'                 =>          false,
            'isDirty'               =>          false,
        ];

        $answersJSON = [];

        foreach( $this->answers as $answer ) {
            array_push( $answersJSON, $answer->toJSONFormat() );
        }

        $json[ 'answers' ] = $answersJSON;

        return $json;
    }
}

?>

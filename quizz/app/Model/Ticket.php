<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model {

    protected $table = 'ticket';

    protected $primaryKey = 'ticket_ID';

    protected $fillable = [
        'ticket', 'is_already_used', 'quizz_ID'
    ];

    public function quizz() {
        return $this->belongsTo( 'App\Model\Quizz', 'quizz_ID' );
    }
}

?>

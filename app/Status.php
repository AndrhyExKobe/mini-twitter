<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    /* model status */
    protected $table = "status";

    public function jUsers()
    {
        return $this->hasOne('App\User','id','id_user');
    }
}

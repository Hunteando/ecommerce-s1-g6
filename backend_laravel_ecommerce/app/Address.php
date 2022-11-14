<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = ['user_id','address_line1','address_line2','city','municipio','state','country'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vendors_services extends Model
{
    protected $fillable = [
        'category_id',
        'vendor_id',
        'price',
    ];
}

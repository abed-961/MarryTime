<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VendorTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'title',
        'description',
        'status',
        'due_date'
    ];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'vendor_id',
        'category_id',
        'appointment_date',
        'location',
        'guests',
        'tables',
        'status',
        'notes',
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}

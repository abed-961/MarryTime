<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuggestAppointment extends Model
{
    use HasFactory;


    protected $fillable = [
        'appointment_id',
        'admin_id',
    ];


    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function admin()
    {
        return $this->belongsTo(User::class);
    }
}

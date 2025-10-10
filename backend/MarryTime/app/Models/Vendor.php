<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    /** @use HasFactory<\Database\Factories\VendorFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id',
        'company_name',
        'location',
        'price_range'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Users that have this vendor (many-to-many)
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_vendor', 'vendor_id', 'user_id');
    }

    // ✅ Vendor offers many services
    public function services()
    {
        return $this->hasMany(VendorsService::class);
    }

    // ✅ Vendor has many availabilities
    public function availabilities()
    {
        return $this->hasMany(Vendors_availability::class);
    }

    public function tasks()
    {
        return $this->hasMany(VendorTask::class);
    }


    public function appointments()
    {
        return $this->belongsToMany(Appointment::class, 'vendor_appointments', 'vendor_id', 'appointment_id')
            ->withTimestamps();
    }



}

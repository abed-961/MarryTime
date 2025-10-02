<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendors_availability extends Model
{
    /** @use HasFactory<\Database\Factories\VendorAvailabilityFactory> */
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'vendor_id',
        'date',
        'start_time',
        'end_time',
        'is_available'
    ];

    // ✅ Availability belongs to a vendor
    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}

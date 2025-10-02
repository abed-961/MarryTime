<?php

namespace App\Models;

use Database\Seeders\Vendors_availabilitySeeder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VendorsService extends Model
{
    /** @use HasFactory<\Database\Factories\VendorsServiceFactory> */
    use HasFactory;
    protected $fillable = [
        'category_id',
        'vendor_id',
        'price',
    ];



    // ✅ Service belongs to a category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // ✅ Service belongs to a vendor
    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}

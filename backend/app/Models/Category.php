<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
    ];
    // ✅ A category can be linked to many vendor services
    public function vendorServices()
    {
        return $this->hasMany(VendorsService::class);
    }
}

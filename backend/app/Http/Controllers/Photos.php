<?php

namespace App\Http\Controllers;

use App\DTO\Response;
use App\Models\WeddingPhoto;
use Illuminate\Http\Request;

class Photos extends Controller
{
    public function index()
    {
        $photos = WeddingPhoto::inRandomOrder()->limit(6)->get();
        return Response::to_json($photos);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function latest(Request $request)
    {
        $user = $request->user();

        // Determine if user is vendor or client
        $query = Review::query();

        if ($user->role === 'vendor') {
            $query->whereHas('vendor', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        } else {
            $query->where('client_id', $user->id);
        }

        $feedbacks = $query->latest()->take(5)->with(['vendor.user', 'category', 'client'])->get();

        return response()->json($feedbacks);
    }

    // Fetch all feedbacks for logged-in user
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Review::query();

        if ($user->role === 'vendor') {
            $query->whereHas('vendor', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        } else {
            $query->where('client_id', $user->id);
        }

        $feedbacks = $query->with(['vendor.user', 'category', 'client'])->latest()->get();

        return response()->json($feedbacks);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\insertReviewRequest;
use App\Models\Category;
use App\Models\Review;
use App\Models\User;
use App\Models\Vendor;
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

    public function store(insertReviewRequest $request, Vendor $vendor)
    { /** @var Request $req */
        $req = $request;

        $user = $req->user();
        // Validated  incoming data
        $validated = $req->validated();


        $validated['vendor_id'] = $vendor->id;
        $validated['category_id'] = Category::inRandomOrder()->first()->id;


        // Set the client_id as the logged-in user
        $validated['client_id'] = $user->id;

        // Create the feedback
        $feedback = Review::create($validated);

        return response()->json([
            'message' => 'Feedback submitted successfully',
            'feedback' => $feedback,
        ]);

    }
}

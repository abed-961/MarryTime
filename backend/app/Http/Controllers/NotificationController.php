<?php

namespace App\Http\Controllers;

use App\DTO\Response;
use App\Models\Notification;
use App\Models\User;
use App\Notifications\GlobalNotification;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notification as NotificationsNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification as FacadesNotification;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $notifications = Notification::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notifications);
    }

    // Mark a notification as read
    public function markRead(Notification $notification)
    {

        $notification->update(['readed_it' => true]);
        return Response::success('updated');
    }

    /**
     * Show the form for creating a new resource.
     */
    public static function create($user = null, $message, $type)
    {
        if (!empty($user)) {
            $notification = [
                'user_id' => $user->id,
                'type' => $type,
                'message' => $message,
                'readed_it' => false,
            ];
            Notification::create($notification);

        } else {
            $users = User::all();
            foreach ($users as $u) {
                $notifications[] = [
                    'user_id' => $u->id,
                    'type' => $type,
                    'message' => $message,
                    'readed_it' => false,

                ];
            }
            Notification::insert($notifications);
        }


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification, Request $request)
    {


        // Make sure the notification belongs to the logged-in user
        if ($notification->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $notification->delete();

        return Response::success('Notification deleted.');
    }

}

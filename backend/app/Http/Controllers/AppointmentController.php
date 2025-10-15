<?php

namespace App\Http\Controllers;

use App\DTO\Response;
use App\Http\Requests\appointmentCreateRequest;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'vendor') {
            // For vendors, show all appointments linked to their vendor account
            $appointments = $user->vendor
                ->appointments()
                ->with(['vendors.user']) // load all vendors and their owners
                ->get();

        } else {
            // For clients, show appointments where the user is the client
            $appointments = Appointment::with('vendors.user')->where('client_id', $user->id)->get();
        }

        return Response::to_json($appointments);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(appointmentCreateRequest $request)
    {
        /** @var Request $req */
        $req = $request;
        $validated = $req->validated();
        $validated['client_id'] = $request->user()->id;
        $validated['status'] = 'pending';

        $appointment = Appointment::create($validated);

        $appointment->vendors()->attach($validated['vendor_id']);
        NotificationController::create(null, 'new appointment is set ', 'success');

        return Response::success($appointment);
    }

   

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment, Request $request)
    {
        $user = $request->user();


        // Optional: check if the user is client or vendor and owns this appointment
        if ($user->role === 'client' && $appointment->client_id !== $user->id) {
            return Response::failure('Unauthorized');
        }

        if ($user->role === 'vendor') {
            $vendors_id = $appointment->vendors->pluck('id')->toArray();
            if (!in_array($user->vendor->id, $vendors_id))
                return Response::failure('Unauthorized');

            $appointment->vendors()->detach($user->vendor->id);
            return Response::success('Appointment refused successfully');
        }

        return Response::failure('Unauthorized');
    }
}

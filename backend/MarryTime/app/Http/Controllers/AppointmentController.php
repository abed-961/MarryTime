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
            $appointments = Appointment::with(['client', 'category'])
                ->where('vendor_id', $user->vendor->id)
                ->get();
        } else {
            // Client view
            $appointments = Appointment::with(['vendor', 'category'])
                ->where('client_id', $user->id)
                ->get();
        }

        return Response::to_json($appointments);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(appointmentCreateRequest $appointmentCreateRequest, Request $request)
    {
        $validated = $appointmentCreateRequest->validated();
        $validated['client_id'] = $request->user()->id;
        $validated['status'] = 'pending';

        $appointment = Appointment::create($validated);

        return Response::success($appointment);
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
    public function destroy(string $id)
    {
        //
    }
}

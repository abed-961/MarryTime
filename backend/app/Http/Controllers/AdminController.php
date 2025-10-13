<?php

namespace App\Http\Controllers;

use App\DTO\Response;
use App\Models\Appointment;
use App\Models\SuggestAppointment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class AdminController extends Controller
{

    public function getAppointments(Request $request)
    {
        if (!$this->admin($request->user())) {
            return Response::failure('you are not admin');
        }
        $appointments = Appointment::all();
        return Response::to_json($appointments);
    }

    public function insertSuggestAppointment(Request $request)
    {

        if (!$this->admin($request->user())) {
            return Response::failure('you are not admin');
        }

        $data = $request->validate([
            'appointment_id' => ['required', Rule::exists('appointments', 'id')],
        ]);

        $data['admin_id'] = $request->user()->id;
        SuggestAppointment::create($data);
        return Response::success('Suggest Inserted');
    }

    public function admin($user)
    {
        if ($user->role !== 'admin') {
            return false;
        }

        return true;
    }


    public function showAllSuggest()
    {
        $appointment = SuggestAppointment::with(['appointment', 'admin'])->limit(8)->get();
        $appointment->load('appointment.category');
        $appointment->load('appointment.vendors');
        $appointment->load('appointment.vendors.user');


        return Response::to_json($appointment);
    }
}

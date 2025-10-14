<?php

namespace App\Http\Controllers;

use App\DTO\Response;
use App\Http\Requests\EditVendorRequest;
use App\Models\Appointment;
use App\Models\SuggestAppointment;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Validation\Rule;


class AdminController extends Controller
{
    public function index(Request $request)
    {
        if (!empty($request->filter)) {
            if ($request->filter === "Deleted") {
                $users = User::onlyTrashed()->get();
            } else {
                $users = User::all();

            }
        } else {
            $users = User::withTrashed()->get();
        }
        return Response::to_json($users);

    }

    public function toggleRole(Request $request, User $user)
    {
        $admin = $request->user();
        if ($user->role === "admin") {
            return Response::failure('You can not change admin role', 500);
        }
        if ($admin->role !== 'admin')
            return Response::failure('Unauthenticated');



        if ($user->role === "vendor") {
            $user->role = "client";
        } else {
            $user->role = "vendor";
        }

        $user->save();
        return Response::success("user edited succefully");
    }
    public function getAppointments(Request $request)
    {
        if (!$this->admin($request->user())) {
            return Response::failure('you are not admin', 500);
        }
        $appointments = Appointment::all();
        return Response::to_json($appointments);
    }

    public function insertSuggestAppointment(Request $request)
    {

        if (!$this->admin($request->user())) {
            return Response::failure('you are not admin', 500);
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

    public function DeleteUser(User $user, Request $request)
    {
        $admin = $request->user();
        if ($admin->role !== "admin") {
            return Response::failure('Unauthenticated');
        }

        $user->delete();
        return Response::success("user Deleted successfully");
    }
    public function restoreUser(Request $request)
    {
        $user = User::withTrashed()->find($request->id);

        if (!$user) {
            return Response::failure('invalid id of user');
        }
        $admin = $request->user();
        if ($admin->role !== 'admin') {
            return Response::failure('you are not an admin');

        }
        $user->restore();
        return Response::success('user restored successfully');

    }

    public function getAllVendors()
    {
        $user = User::all();
        $user->load('vendor');
        return Response::to_json($user);
    }

    public function editVendor(EditVendorRequest $request, Vendor $vendor)
    {
        $data = $request->validated();
        $vendor->update($data);
        return Response::success('vendor updated succefully');
    }
}

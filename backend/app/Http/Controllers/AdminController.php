<?php

namespace App\Http\Controllers;

use App\DTO\Response;
use App\Http\Requests\EditVendorRequest;
use App\Http\Requests\PhotoWeddingRequest;
use App\Models\Appointment;
use App\Models\SuggestAppointment;
use App\Models\User;
use App\Models\Vendor;
use App\Models\WeddingPhoto;
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
        NotificationController::create($user, 'admin changed your role at ' . now(), 'success');

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
        $user = $request->user();
        if (!$this->admin($user)) {
            return Response::failure('you are not admin', 500);
        }

        $data = $request->validate([
            'appointment_id' => ['required', Rule::exists('appointments', 'id')],
        ]);

        $data['admin_id'] = $request->user()->id;
        SuggestAppointment::create($data);
        NotificationController::create($user, 'you inserted new information at ' . now(), 'success');

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
        NotificationController::create($admin, 'you deleted user ' . $user->name . ' at ' . now(), 'error');
        $user->delete();
        return Response::success("user Deleted successfully");
    }
    public function restoreUser(Request $request)
    {
        $admin = $request->user();
        $user = User::withTrashed()->find($request->id);

        if (!$user) {
            return Response::failure('invalid id of user');
        }
        $admin = $request->user();
        if ($admin->role !== 'admin') {
            return Response::failure('you are not an admin');

        }
        $user->restore();
        NotificationController::create($admin, 'your restored user ' . $user->name, 'warning');

        return Response::success('user restored successfully');

    }

    public function getAllVendors()
    {
        $user = User::all();
        $user->load('vendor');
        return Response::to_json($user);
    }

    public function editVendor(EditVendorRequest $request, User $user)
    {
        $user1 = $request->user();
        $data = $request->validated();
        $vendorExist = Vendor::where('user_id', $user1->id)->exists();

        if ($vendorExist) {
            $vendor = Vendor::where('user_id', $user->id);
            $vendor->update($data);
            NotificationController::create($user, 'you edited your vendor information at' . now(), 'info');
            return Response::success('vendor updated succefully');
        } else {
            $data['user_id'] = $user->id;
            Vendor::create($data);
            NotificationController::create($user, 'you finish your vendor information at' . now(), 'success');
            return Response::success('vendor data inserted succefully');

        }


    }

    public function storePhoto(PhotoWeddingRequest $request)
    {
        $data = $request->validated();
        $photo = $request->file('photo');
        $photo_name = now() . 'Marry_Time_Wedding' . $photo->getClientOriginalName();
        $data['photo'] = $photo_name;
        WeddingPhoto::create($data);
        $photo->storeAs('photos', $photo_name, 'public');


        $admin = $request->user();
        NotificationController::create($admin, 'new photo inserted', 'warning');
        return Response::success('photo inserted succefully');
    }
}

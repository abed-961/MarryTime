<?php

namespace App\Http\Controllers;

use App\DTO\Response;
use App\Http\Requests\addTaskRequest;
use App\Models\User;
use App\Models\Vendor;
use App\Models\VendorTask;
use Illuminate\Http\Request;

class VendorsController extends Controller
{
    public function loadTasks(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'vendor') {
            return Response::failure('you are not a vendor ');
        }
        $vendor = $user->vendor;
        if (!$vendor) {
            return Response::to_json([]);
        }
        $tasks = $vendor->tasks()->get();

        return Response::to_json($tasks);
    }

    public function getVendorId(Request $request)
    {
        $user = $request->user();
        $vendorId = $user->vendor->id;
        return Response::to_json($vendorId);
    }

    public function addTask(addTaskRequest $request, Vendor $vendor)
    {
        $data = $request->validated();
        $data['vendor_id'] = $vendor->id;

        VendorTask::create($data);
        NotificationController::create($vendor, 'new task added ', 'info');

        return Response::success('task added ');
    }

    public function vendorTaskFilter(Request $request)
    {
        $user = $request->user();

        // Ensure user is a vendor
        if ($user->role !== 'vendor' || !$user->vendor) {
            return response()->json([
                'success' => false,
                'message' => 'You are not a vendor'
            ], 403);
        }

        $vendor = $user->vendor;
        $filter = $request->query('filter');// optional
        $query = $vendor->tasks(); // start with all tasks of vendor

        if ($filter) {
            $query->where('status', $filter); // apply filter only if it exists
        }

        $tasks = $query->get();
        return $tasks;
    }

    public function updateStatus(Request $request, VendorTask $task)
    {
        $user = $request->user();

        // Ensure the task belongs to the vendor
        if ($user->role !== 'vendor' || $task->vendor_id !== $user->vendor->id) {
            return Response::failure('Unauthorized', 403);
        }

        // Validate the new status
        $request->validate([
            'status' => 'required|in:pending,in_progress,completed',
        ]);

        $task->status = $request->input('status');
        $task->save();


        return Response::success('task updated');
    }

    public function destroy(Request $request, VendorTask $task)
    {
        $user = $request->user();

        if (!$task) {
            return Response::failure('Task not found', 404);
        }
        // Check if the task belongs to the vendor
        if ($user->role !== 'vendor' || $task->vendor_id !== $user->vendor->id) {
            return Response::failure('Unauthorized', 404);
        }
        $task->delete();
        NotificationController::create($user, 'one task deleted at ' . now(), 'warning');

        return Response::success('Task deleted successfully');
    }

    public function index(Request $request)
    {
        $query = User::with('vendor'); // eager load vendor

        if ($request->has('search') && !empty($request->input('search'))) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%");
        }

        // Only users who have a vendor record
        $query->has('vendor');

        $vendors = $query->orderBy('name')->get();

        // Format response: include company_name
        $vendors = $vendors->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'company_name' => $user->vendor->company_name ?? null
            ];
        });

        return response()->json($vendors);
    }


    public function getVendorById(Vendor $vendor)
    {
        return Response::to_json($vendor->load('user'));
    }
}


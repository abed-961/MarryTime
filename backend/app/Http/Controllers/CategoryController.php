<?php

namespace App\Http\Controllers;

use App\DTO\Response;
use App\Http\Requests\InsertCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {

        $query = Category::query();
        if ($request->has('search') && !empty($request->input('search'))) {
            $search = $request->input('search');
            $query->where('name', 'like', `%{$search}%`);
        }
        $categories = $query->orderBy('name')
            ->get(['id', 'name']);


        return Response::to_json($categories);
    }
    public function store(InsertCategoryRequest $request)
    {
        $validated = $request->validated();


        $category = Category::create($validated);

        return Response::success('category inserted succefully', 201);
    }
}

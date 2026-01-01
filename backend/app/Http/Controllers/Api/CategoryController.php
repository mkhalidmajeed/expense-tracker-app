<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Get system categories (user_id is null) OR user's categories
        $categories = Category::where('user_id', null)
            ->orWhere('user_id', $request->user()->id)
            ->get();
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:expense,income',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $category = $request->user()->categories()->create($request->all());

        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = $request->user()->categories()->findOrFail($id);
        
        $request->validate([
            'name' => 'sometimes|string',
            'type' => 'sometimes|in:expense,income',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $category->update($request->all());

        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $category = $request->user()->categories()->findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Category deleted']);
    }
}

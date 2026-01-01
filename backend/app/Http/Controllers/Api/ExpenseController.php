<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Expense;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Add query parameters for filtering if needed later (month/year)
        $expenses = $request->user()->expenses()
            ->with('category')
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json($expenses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'description' => 'nullable|string',
            'image_path' => 'nullable|string' 
        ]);

        $expense = $request->user()->expenses()->create($request->all());

        return response()->json($expense->load('category'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $expense = $request->user()->expenses()->with('category')->findOrFail($id);
        return response()->json($expense);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $expense = $request->user()->expenses()->findOrFail($id);

        $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'amount' => 'sometimes|numeric',
            'date' => 'sometimes|date',
            'description' => 'nullable|string',
            'image_path' => 'nullable|string'
        ]);

        $expense->update($request->all());

        return response()->json($expense->load('category'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $expense = $request->user()->expenses()->findOrFail($id);
        $expense->delete();
        return response()->json(['message' => 'Expense deleted']);
    }
}

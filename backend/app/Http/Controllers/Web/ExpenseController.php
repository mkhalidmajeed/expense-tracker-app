<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Expense::where('user_id', $request->user()->id)
            ->with('category')
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc');

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $expenses = $query->paginate(10)->withQueryString()->through(function ($expense) {
            return [
                'id' => $expense->id,
                'title' => $expense->title,
                'amount' => $expense->amount,
                'date' => $expense->date,
                'description' => $expense->description,
                'category' => $expense->category,
            ];
        });

        return Inertia::render('Expenses/Index', [
            'expenses' => $expenses,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Expenses/Create', [
            'categories' => Category::all(),
            'type' => request()->query('type'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'date' => 'required|date',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
        ]);

        $request->user()->expenses()->create($validated);

        return Redirect::route('expenses.index')->with('success', 'Expense created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        if ($expense->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Expenses/Edit', [
            'expense' => $expense,
            'categories' => Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        if ($expense->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'date' => 'required|date',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
        ]);

        $expense->update($validated);

        return Redirect::route('expenses.index')->with('success', 'Expense updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        if ($expense->user_id !== auth()->id()) {
            abort(403);
        }

        $expense->delete();

        return Redirect::route('expenses.index')->with('success', 'Expense deleted successfully.');
    }
}

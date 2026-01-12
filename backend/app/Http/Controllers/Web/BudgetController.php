<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Budget;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BudgetController extends Controller
{
    public function index(Request $request)
    {
        $year = $request->input('year', now()->year);
        $month = $request->input('month', now()->month);

        $budgets = Budget::where('user_id', $request->user()->id)
            ->where('year', $year)
            ->where('month', $month)
            ->with(['category'])
            ->get();

        $categories = Category::where('user_id', $request->user()->id)
            ->where('type', 'expense')
            ->orWhereNull('user_id')
            ->orderBy('name')
            ->get();

        return Inertia::render('Budgets/Index', [
            'budgets' => $budgets,
            'categories' => $categories,
            'filters' => [
                'year' => $year,
                'month' => $month,
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:0',
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:2020|max:2030',
        ]);

        $request->user()->budgets()->updateOrCreate(
            [
                'category_id' => $validated['category_id'],
                'month' => $validated['month'],
                'year' => $validated['year'],
            ],
            [
                'amount' => $validated['amount'],
            ]
        );

        return Redirect::back()->with('success', 'Budget updated successfully.');
    }
}

<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Expense;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $now = Carbon::now();

        // 1. Spending by Category (This Month)
        $expensesByCategory = Expense::where('expenses.user_id', $user->id)
            ->whereYear('date', $now->year)
            ->whereMonth('date', $now->month)
            ->join('categories', 'expenses.category_id', '=', 'categories.id')
            ->select('categories.name', 'categories.color', DB::raw('sum(expenses.amount) as total'))
            ->groupBy('categories.name', 'categories.color')
            ->orderByDesc('total')
            ->get();

        // 2. Spending History (Last 12 Months)
        $monthlySpending = [];
        for ($i = 11; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $total = Expense::where('user_id', $user->id)
                ->whereYear('date', $month->year)
                ->whereMonth('date', $month->month)
                ->sum('amount');

            $monthlySpending[] = [
                'month' => $month->format('M Y'),
                'total' => $total,
            ];
        }

        return Inertia::render('Reports/Index', [
            'categoryBreakdown' => $expensesByCategory,
            'monthlySpending' => $monthlySpending,
            'currentMonth' => $now->format('F Y'),
        ]);
    }
}

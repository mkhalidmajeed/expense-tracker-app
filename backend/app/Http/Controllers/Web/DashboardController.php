<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $now = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth = $now->copy()->endOfMonth();

        // Helper to get expenses with category type
        $query = Expense::where('expenses.user_id', $user->id)
            ->join('categories', 'expenses.category_id', '=', 'categories.id');

        // 1. Current Month Stats
        $currentMonthQuery = (clone $query)->whereBetween('expenses.date', [$startOfMonth, $endOfMonth]);

        $income = (clone $currentMonthQuery)->where('categories.type', 'income')->sum('expenses.amount');
        $expense = (clone $currentMonthQuery)->where('categories.type', 'expense')->sum('expenses.amount');
        $balance = $income - $expense;
        $savings = $income > 0 ? $balance : 0;

        // 2. Comparison with Last Month (Expense Only for now)
        $lastMonthStart = $now->copy()->subMonth()->startOfMonth();
        $lastMonthEnd = $now->copy()->subMonth()->endOfMonth();

        $lastMonthExpense = (clone $query)
            ->whereBetween('expenses.date', [$lastMonthStart, $lastMonthEnd])
            ->where('categories.type', 'expense')
            ->sum('expenses.amount');

        $expenseChange = 0;
        if ($lastMonthExpense > 0) {
            $expenseChange = (($expense - $lastMonthExpense) / $lastMonthExpense) * 100;
        }

        // 3. Recent Transactions (Limit 5)
        $recentExpenses = Expense::where('expenses.user_id', $user->id)
            ->with('category')
            ->orderBy('expenses.date', 'desc')
            ->orderBy('expenses.created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($expense) {
                return [
                    'id' => $expense->id,
                    'title' => $expense->title,
                    'amount' => $expense->amount,
                    'date' => Carbon::parse($expense->date)->format('M d, Y'),
                    'category_name' => $expense->category ? $expense->category->name : 'Uncategorized',
                    'category_color' => $expense->category ? $expense->category->color : '#6b7280',
                    'category_icon' => $expense->category ? $expense->category->icon : 'help-circle',
                    'type' => $expense->category ? $expense->category->type : 'expense',
                ];
            });

        // 4. Monthly History (Last 6 months)
        $chartData = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $monthQuery = (clone $query)
                ->whereYear('expenses.date', $month->year)
                ->whereMonth('expenses.date', $month->month);

            $monthIncome = (clone $monthQuery)->where('categories.type', 'income')->sum('expenses.amount');
            $monthExpense = (clone $monthQuery)->where('categories.type', 'expense')->sum('expenses.amount');

            $chartData[] = [
                'month' => $month->format('M'),
                'income' => $monthIncome,
                'expense' => $monthExpense,
            ];
        }

        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'income' => $income,
                'expense' => $expense,
                'balance' => $balance,
                'savings' => $savings,
                'expenseChange' => round($expenseChange, 1),
            ],
            'recentExpenses' => $recentExpenses,
            'chartData' => $chartData,
        ]);
    }
}

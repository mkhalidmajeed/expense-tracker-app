<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Expense;

class DashboardController extends Controller
{
    public function stats(Request $request)
    {
        $userId = $request->user()->id;
        $startOfMonth = now()->startOfMonth()->toDateString();
        $endOfMonth = now()->endOfMonth()->toDateString();
        $currentMonthName = now()->format('F Y');

        // Total Expenses this month
        $totalExpenses = Expense::where('user_id', $userId)
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->sum('amount');

        // Breakdown by Category
        $categoryBreakdown = Expense::where('user_id', $userId)
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->join('categories', 'expenses.category_id', '=', 'categories.id')
            ->select('categories.name', 'categories.color', DB::raw('sum(expenses.amount) as total'))
            ->groupBy('categories.name', 'categories.color')
            ->get();

        // Recent Transactions (Limit 5)
        $recentTransactions = Expense::where('user_id', $userId)
            ->with('category')
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'month' => $currentMonthName,
            'total_expenses' => $totalExpenses,
            'category_breakdown' => $categoryBreakdown,
            'recent_transactions' => $recentTransactions
        ]);
    }
}

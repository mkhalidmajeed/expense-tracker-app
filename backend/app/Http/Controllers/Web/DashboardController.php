<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $now = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth = $now->copy()->endOfMonth();
        
        // 1. Total Expenses This Month
        $currentMonthTotal = Expense::where('user_id', $user->id)
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->sum('amount');
            
        // 2. comparison with Last Month
        $lastMonthStart = $now->copy()->subMonth()->startOfMonth();
        $lastMonthEnd = $now->copy()->subMonth()->endOfMonth();
        
        $lastMonthTotal = Expense::where('user_id', $user->id)
            ->whereBetween('date', [$lastMonthStart, $lastMonthEnd])
            ->sum('amount');
            
        $percentageChange = 0;
        if ($lastMonthTotal > 0) {
            $percentageChange = (($currentMonthTotal - $lastMonthTotal) / $lastMonthTotal) * 100;
        }

        // 3. Recent Transactions (Limit 5)
        $recentExpenses = Expense::where('user_id', $user->id)
            ->with('category')
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
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
                ];
            });

        // 4. Monthly Spending Chart Data (Last 6 months)
        $chartData = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $total = Expense::where('user_id', $user->id)
                ->whereYear('date', $month->year)
                ->whereMonth('date', $month->month)
                ->sum('amount');
            
            $chartData[] = [
                'month' => $month->format('M'),
                'total' => $total
            ];
        }

        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'currentMonthTotal' => $currentMonthTotal,
                'lastMonthTotal' => $lastMonthTotal,
                'percentageChange' => round($percentageChange, 1),
            ],
            'recentExpenses' => $recentExpenses,
            'chartData' => $chartData,
        ]);
    }
}

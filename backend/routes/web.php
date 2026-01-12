<?php

use App\Http\Controllers\Web\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Marketing Pages
Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/features', function () {
    return Inertia::render('Features');
});

Route::get('/how-it-works', function () {
    return Inertia::render('HowItWorks');
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

// Handle contact form submission
Route::post('/contact', function (Illuminate\Http\Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'subject' => 'required|string|max:255',
        'message' => 'required|string',
    ]);

    // TODO: Send email or store in database
    // For now, just redirect back with success

    return redirect()->back();
});

// Legal Pages
Route::get('/terms', function () {
    return Inertia::render('Terms');
});

Route::get('/privacy', function () {
    return Inertia::render('Privacy');
});

// Guest routes (login & register)
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'loginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/register', [AuthController::class, 'registerForm']);
    Route::post('/register', [AuthController::class, 'register']);
});

// Authenticated routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Dashboard
    Route::get('/dashboard', [\App\Http\Controllers\Web\DashboardController::class, 'index'])->name('dashboard');

    // Expenses
    Route::resource('expenses', \App\Http\Controllers\Web\ExpenseController::class);

    // Categories
    Route::resource('categories', \App\Http\Controllers\Web\CategoryController::class);

    // Profile & Settings
    Route::get('/profile', [\App\Http\Controllers\Web\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [\App\Http\Controllers\Web\ProfileController::class, 'update'])->name('profile.update');

    // Reports
    Route::get('/reports', [\App\Http\Controllers\Web\ReportController::class, 'index'])->name('reports.index');

    // Budgets
    Route::get('/budgets', [\App\Http\Controllers\Web\BudgetController::class, 'index'])->name('budgets.index');
    Route::post('/budgets', [\App\Http\Controllers\Web\BudgetController::class, 'store'])->name('budgets.store');
});

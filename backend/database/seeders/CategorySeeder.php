<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            // Essential Living
            ['name' => 'Housing', 'type' => 'expense', 'icon' => 'home', 'color' => '#FF5733'],
            ['name' => 'Groceries', 'type' => 'expense', 'icon' => 'cart', 'color' => '#33FF57'],
            ['name' => 'Transportation', 'type' => 'expense', 'icon' => 'car', 'color' => '#3357FF'],
            ['name' => 'Insurance', 'type' => 'expense', 'icon' => 'shield', 'color' => '#FF33A1'],
            ['name' => 'Healthcare', 'type' => 'expense', 'icon' => 'medical-bag', 'color' => '#33FFF5'],
            // Daily Spending
            ['name' => 'Dining Out', 'type' => 'expense', 'icon' => 'food', 'color' => '#F5FF33'],
            ['name' => 'Shopping', 'type' => 'expense', 'icon' => 'shopping', 'color' => '#FF8C33'],
            ['name' => 'Entertainment', 'type' => 'expense', 'icon' => 'movie', 'color' => '#8C33FF'],
            ['name' => 'Personal Care', 'type' => 'expense', 'icon' => 'face-man', 'color' => '#FF3333'],
            // Financial
            ['name' => 'Savings', 'type' => 'expense', 'icon' => 'bank', 'color' => '#33FF8C'],
            ['name' => 'Investments', 'type' => 'expense', 'icon' => 'chart-line', 'color' => '#338CFF'],
            ['name' => 'Debt Payments', 'type' => 'expense', 'icon' => 'credit-card', 'color' => '#FF338C'],
            ['name' => 'Emergency Fund', 'type' => 'expense', 'icon' => 'alert', 'color' => '#FF5733'],
            // Occasional
            ['name' => 'Travel & Vacation', 'type' => 'expense', 'icon' => 'airplane', 'color' => '#33A1FF'],
            ['name' => 'Gifts & Donations', 'type' => 'expense', 'icon' => 'gift', 'color' => '#A133FF'],
            ['name' => 'Education', 'type' => 'expense', 'icon' => 'school', 'color' => '#FF33F5'],
            ['name' => 'Home Improvement', 'type' => 'expense', 'icon' => 'format-paint', 'color' => '#33FF33'],
            ['name' => 'Pet Care', 'type' => 'expense', 'icon' => 'paw', 'color' => '#FF8C33'],
            ['name' => 'Subscriptions', 'type' => 'expense', 'icon' => 'refresh', 'color' => '#8CFF33'],
            // Flexible
            ['name' => 'Miscellaneous', 'type' => 'expense', 'icon' => 'dots-horizontal', 'color' => '#808080'],
            // Income
            ['name' => 'Salary', 'type' => 'income', 'icon' => 'cash', 'color' => '#10B981'],
            ['name' => 'Freelance', 'type' => 'income', 'icon' => 'briefcase', 'color' => '#3B82F6'],
            ['name' => 'Investments', 'type' => 'income', 'icon' => 'trending-up', 'color' => '#8B5CF6'],
            ['name' => 'Gifts', 'type' => 'income', 'icon' => 'gift', 'color' => '#F59E0B'],
            ['name' => 'Rental Income', 'type' => 'income', 'icon' => 'home', 'color' => '#EC4899'],
            ['name' => 'Other Income', 'type' => 'income', 'icon' => 'dots-horizontal', 'color' => '#6B7280'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}

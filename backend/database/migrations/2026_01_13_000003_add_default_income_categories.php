<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $categories = [
            ['name' => 'Salary', 'type' => 'income', 'icon' => 'cash', 'color' => '#10B981', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['name' => 'Freelance', 'type' => 'income', 'icon' => 'briefcase', 'color' => '#3B82F6', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['name' => 'Investments', 'type' => 'income', 'icon' => 'trending-up', 'color' => '#8B5CF6', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['name' => 'Gifts', 'type' => 'income', 'icon' => 'gift', 'color' => '#F59E0B', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['name' => 'Rental Income', 'type' => 'income', 'icon' => 'home', 'color' => '#EC4899', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['name' => 'Other Income', 'type' => 'income', 'icon' => 'dots-horizontal', 'color' => '#6B7280', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];

        DB::table('categories')->insert($categories);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('categories')->where('type', 'income')->delete();
    }
};

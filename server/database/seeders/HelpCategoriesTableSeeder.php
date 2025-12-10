<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HelpCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Ordering & Purchasing',
                'slug' => 'ordering-purchasing',
                'description' => 'Learn how to place orders, make payments, and track your deliveries',
                'sort_order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Account & Profile',
                'slug' => 'account-profile',
                'description' => 'Manage your account settings, profile information, and preferences',
                'sort_order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Returns & Refunds',
                'slug' => 'returns-refunds',
                'description' => 'Understand our return policy and refund process',
                'sort_order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Delivery & Shipping',
                'slug' => 'delivery-shipping',
                'description' => 'Information about delivery times, shipping options, and tracking',
                'sort_order' => 4,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        DB::table('help_categories')->insert($categories);
    }
}
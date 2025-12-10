<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HelpTopicsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get category IDs
        $orderingCategoryId = DB::table('help_categories')->where('slug', 'ordering-purchasing')->first()->id ?? 1;
        $accountCategoryId = DB::table('help_categories')->where('slug', 'account-profile')->first()->id ?? 2;
        $returnsCategoryId = DB::table('help_categories')->where('slug', 'returns-refunds')->first()->id ?? 3;
        $deliveryCategoryId = DB::table('help_categories')->where('slug', 'delivery-shipping')->first()->id ?? 4;

        $topics = [
            [
                'category_id' => $orderingCategoryId,
                'title' => 'Place an Order',
                'slug' => 'place-order',
                'description' => 'Learn how to browse products and place your first order.',
                'content' => '<p>Follow these simple steps to place your first order with FoodStuff:</p>',
                'icon' => 'shopping-cart',
                'sort_order' => 1,
                'is_active' => true,
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'category_id' => $orderingCategoryId,
                'title' => 'Payment Options',
                'slug' => 'payment-options',
                'description' => 'Discover all the payment methods we support.',
                'content' => '<p>We offer several secure payment options to make your shopping experience convenient and safe.</p>',
                'icon' => 'credit-card',
                'sort_order' => 2,
                'is_active' => true,
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'category_id' => $deliveryCategoryId,
                'title' => 'Track an Order',
                'slug' => 'track-order',
                'description' => 'Find out how to track your order status and delivery.',
                'content' => '<p>You can easily track your order status and delivery progress through your account.</p>',
                'icon' => 'truck',
                'sort_order' => 3,
                'is_active' => true,
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'category_id' => $orderingCategoryId,
                'title' => 'Cancel an Order',
                'slug' => 'cancel-order',
                'description' => 'Learn how to cancel your order before it ships.',
                'content' => '<p>Orders can be cancelled if they are still in the processing stage.</p>',
                'icon' => 'ban',
                'sort_order' => 4,
                'is_active' => true,
                'is_featured' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'category_id' => $returnsCategoryId,
                'title' => 'Returns & Refunds',
                'slug' => 'returns-refunds',
                'description' => 'Understand our return policy and refund process.',
                'content' => '<p>Our return policy ensures you can shop with confidence.</p>',
                'icon' => 'undo',
                'sort_order' => 5,
                'is_active' => true,
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        DB::table('help_topics')->insert($topics);
    }
}
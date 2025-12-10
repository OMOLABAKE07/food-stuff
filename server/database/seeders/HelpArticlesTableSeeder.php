<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HelpArticlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get topic IDs
        $placeOrderTopicId = DB::table('help_topics')->where('slug', 'place-order')->first()->id ?? 1;
        $paymentOptionsTopicId = DB::table('help_topics')->where('slug', 'payment-options')->first()->id ?? 2;
        $trackOrderTopicId = DB::table('help_topics')->where('slug', 'track-order')->first()->id ?? 3;
        $cancelOrderTopicId = DB::table('help_topics')->where('slug', 'cancel-order')->first()->id ?? 4;
        $returnsRefundsTopicId = DB::table('help_topics')->where('slug', 'returns-refunds')->first()->id ?? 5;

        $articles = [
            // Place Order articles
            [
                'topic_id' => $placeOrderTopicId,
                'title' => 'Browse Products',
                'slug' => 'browse-products',
                'content' => '<p>Visit our products page to browse through our wide selection of food items. You can use the search bar or filter by category to find what you\'re looking for.</p>',
                'sort_order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'topic_id' => $placeOrderTopicId,
                'title' => 'Add to Cart',
                'slug' => 'add-to-cart',
                'content' => '<p>Click the "Add to Cart" button on any product you wish to purchase. You can adjust quantities in your cart before checkout.</p>',
                'sort_order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'topic_id' => $placeOrderTopicId,
                'title' => 'Proceed to Checkout',
                'slug' => 'proceed-to-checkout',
                'content' => '<p>Click the cart icon in the top right corner and select "Checkout" to proceed with your order.</p>',
                'sort_order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            
            // Payment Options articles
            [
                'topic_id' => $paymentOptionsTopicId,
                'title' => 'Credit/Debit Cards',
                'slug' => 'credit-debit-cards',
                'content' => '<p>Pay with Visa, Mastercard, or other major credit/debit cards. All transactions are secured with SSL encryption.</p>',
                'sort_order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'topic_id' => $paymentOptionsTopicId,
                'title' => 'Bank Transfer',
                'slug' => 'bank-transfer',
                'content' => '<p>Transfer directly from your bank account. Instructions will be provided during checkout.</p>',
                'sort_order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        DB::table('help_articles')->insert($articles);
    }
}
<?php

namespace Product\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::factory()->count(20)->create();
        $this->call(ProductSeeder::class);
    }
    
}

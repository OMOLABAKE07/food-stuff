<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-12 text-white">
      <div class="max-w-2xl">
        <h1 class="text-4xl font-bold mb-4">Welcome to FoodStuff</h1>
        <p class="text-xl mb-6">Fresh, quality food delivered to your doorstep</p>
        <router-link 
          to="/products" 
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
        >
          Shop Now
          <svg class="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </router-link>
      </div>
    </div>
    
    <!-- Featured Categories -->
    <div class="mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Shop by Category</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Fresh Produce</h3>
            <p class="text-gray-600 mb-4">Farm-fresh fruits and vegetables</p>
            <router-link to="/products?category=fresh-produce" class="text-indigo-600 hover:text-indigo-800 font-medium">
              Shop Now →
            </router-link>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Meat & Seafood</h3>
            <p class="text-gray-600 mb-4">Premium cuts and fresh catches</p>
            <router-link to="/products?category=meat-seafood" class="text-indigo-600 hover:text-indigo-800 font-medium">
              Shop Now →
            </router-link>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Bakery</h3>
            <p class="text-gray-600 mb-4">Fresh breads and pastries daily</p>
            <router-link to="/products?category=bakery" class="text-indigo-600 hover:text-indigo-800 font-medium">
              Shop Now →
            </router-link>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Beverages</h3>
            <p class="text-gray-600 mb-4">Refreshing drinks for every occasion</p>
            <router-link to="/products?category=beverages" class="text-indigo-600 hover:text-indigo-800 font-medium">
              Shop Now →
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Featured Products -->
    <div class="mb-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-900">Featured Products</h2>
        <router-link to="/products" class="text-indigo-600 hover:text-indigo-800 font-medium">
          View All →
        </router-link>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Product Card Placeholder -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Organic Apples</h3>
            <p class="text-gray-600 text-sm mb-3">Fresh Produce</p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-gray-900">₦1,200</span>
              <button class="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Atlantic Salmon</h3>
            <p class="text-gray-600 text-sm mb-3">Seafood</p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-gray-900">₦3,500</span>
              <button class="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Artisan Bread</h3>
            <p class="text-gray-600 text-sm mb-3">Bakery</p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-gray-900">₦800</span>
              <button class="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Cold Brew Coffee</h3>
            <p class="text-gray-600 text-sm mb-3">Beverages</p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-gray-900">₦1,500</span>
              <button class="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Why Choose Us -->
    <div class="bg-gray-50 rounded-2xl p-8 mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">Why Choose FoodStuff?</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
          <p class="text-gray-600">We source only the finest ingredients from trusted suppliers.</p>
        </div>
        
        <div class="text-center">
          <div class="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
          <p class="text-gray-600">Lightning-fast delivery within 2 hours of ordering.</p>
        </div>
        
        <div class="text-center">
          <div class="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Secure Payments</h3>
          <p class="text-gray-600">Multiple secure payment options for your convenience.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Home page component
</script>
<template>
  <div class="container mx-auto px-4 py-8">
    <router-link to="/help" class="text-indigo-600 hover:text-indigo-800 flex items-center mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      Back to Help Center
    </router-link>
    
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Track Your Order</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-medium text-gray-900 mb-4">How to Track Your Order</h2>
      
      <div class="space-y-6">
        <div class="flex">
          <div class="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
            <span class="text-indigo-800 font-bold">1</span>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Log Into Your Account</h3>
            <p class="text-gray-600">Sign in to your FoodStuff account using your email and password.</p>
          </div>
        </div>
        
        <div class="flex">
          <div class="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
            <span class="text-indigo-800 font-bold">2</span>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Go to "My Orders"</h3>
            <p class="text-gray-600">Navigate to the "My Orders" section from the main menu or your account dashboard.</p>
          </div>
        </div>
        
        <div class="flex">
          <div class="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
            <span class="text-indigo-800 font-bold">3</span>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Select Your Order</h3>
            <p class="text-gray-600">Find the order you want to track and click on it to view detailed information.</p>
          </div>
        </div>
        
        <div class="flex">
          <div class="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
            <span class="text-indigo-800 font-bold">4</span>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">View Tracking Information</h3>
            <p class="text-gray-600">You'll see the current status of your order, estimated delivery time, and tracking number if applicable.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-medium text-gray-900 mb-4">Order Status Definitions</h2>
      
      <div class="space-y-4">
        <div class="border-l-4 border-indigo-500 pl-4 py-1">
          <h3 class="font-medium text-gray-900">Processing</h3>
          <p class="text-gray-600">Your order has been received and is being prepared for shipment.</p>
        </div>
        
        <div class="border-l-4 border-yellow-500 pl-4 py-1">
          <h3 class="font-medium text-gray-900">Shipped</h3>
          <p class="text-gray-600">Your order has been shipped and is on its way to you.</p>
        </div>
        
        <div class="border-l-4 border-green-500 pl-4 py-1">
          <h3 class="font-medium text-gray-900">Out for Delivery</h3>
          <p class="text-gray-600">Your order is out for delivery and will arrive soon.</p>
        </div>
        
        <div class="border-l-4 border-blue-500 pl-4 py-1">
          <h3 class="font-medium text-gray-900">Delivered</h3>
          <p class="text-gray-600">Your order has been successfully delivered.</p>
        </div>
      </div>
    </div>
    
    <div class="bg-blue-50 rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-3">Need Help with Your Order?</h3>
      <p class="text-gray-600 mb-4">If you can't find your order or have questions about your delivery, our support team can help.</p>
      <router-link to="/live-chat" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Chat with Support
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>
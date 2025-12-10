<template>
  <div class="container mx-auto px-4 py-8">
    <router-link to="/help" class="text-indigo-600 hover:text-indigo-800 flex items-center mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      Back to Help Center
    </router-link>
    
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Cancel an Order</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-medium text-gray-900 mb-4">How to Cancel Your Order</h2>
      
      <div class="space-y-6">
        <div class="flex">
          <div class="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
            <span class="text-indigo-800 font-bold">1</span>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Check Order Status</h3>
            <p class="text-gray-600">Log into your account and go to "My Orders" to check the current status of your order.</p>
          </div>
        </div>
        
        <div class="flex">
          <div class="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
            <span class="text-indigo-800 font-bold">2</span>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Eligibility for Cancellation</h3>
            <p class="text-gray-600">Orders can only be cancelled if they are still in the "Processing" status. Once an order has been shipped, it cannot be cancelled.</p>
          </div>
        </div>
        
        <div class="flex">
          <div class="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
            <span class="text-indigo-800 font-bold">3</span>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Contact Customer Support</h3>
            <p class="text-gray-600">If your order is eligible for cancellation, contact our customer support team through live chat or email with your order number.</p>
          </div>
        </div>
        
        <div class="flex">
          <div class="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
            <span class="text-indigo-800 font-bold">4</span>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Confirmation</h3>
            <p class="text-gray-600">Our team will process your cancellation request and send you a confirmation email once it's completed.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-yellow-50 rounded-lg p-6 mb-8">
      <h3 class="text-lg font-medium text-gray-900 mb-3">Important Notes</h3>
      <ul class="list-disc pl-5 space-y-2 text-gray-600">
        <li>Cancellations are not possible for orders that have already been shipped</li>
        <li>Refunds for cancelled orders will be processed within 5-7 business days</li>
        <li>You'll receive a confirmation email once your cancellation is processed</li>
        <li>If you paid by credit/debit card, the refund will be credited to the same card</li>
      </ul>
    </div>
    
    <div class="bg-blue-50 rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-3">Need Immediate Assistance?</h3>
      <p class="text-gray-600 mb-4">If you need urgent help with cancelling your order, our support team is available 24/7.</p>
      <router-link to="/live-chat" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Chat with Support Now
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>
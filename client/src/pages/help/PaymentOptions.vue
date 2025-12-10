<template>
  <div class="container mx-auto px-4 py-8">
    <router-link to="/help" class="text-indigo-600 hover:text-indigo-800 flex items-center mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      Back to Help Center
    </router-link>
    
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Payment Options</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <p class="text-gray-600 mb-6">We offer several secure payment options to make your shopping experience convenient and safe.</p>
      
      <div class="space-y-6">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900">Credit/Debit Cards</h3>
            <p class="text-gray-600 mt-1">Pay with Visa, Mastercard, or other major credit/debit cards. All transactions are secured with SSL encryption.</p>
          </div>
        </div>
        
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900">Bank Transfer</h3>
            <p class="text-gray-600 mt-1">Transfer directly from your bank account. Instructions will be provided during checkout.</p>
          </div>
        </div>
        
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900">Mobile Money</h3>
            <p class="text-gray-600 mt-1">Pay using your mobile money wallet. Available for select countries.</p>
          </div>
        </div>
        
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900">Cash on Delivery</h3>
            <p class="text-gray-600 mt-1">Pay in cash when your order is delivered. Available in select areas.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-blue-50 rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-3">Security Assurance</h3>
      <p class="text-gray-600 mb-4">All payment transactions are encrypted and processed through secure payment gateways. We never store your complete card information on our servers.</p>
      <router-link to="/live-chat" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Contact Support
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>
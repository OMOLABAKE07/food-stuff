<template>
  <div class="container mx-auto px-4 py-8">
    <router-link to="/help" class="text-indigo-600 hover:text-indigo-800 flex items-center mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      Back to Help Center
    </router-link>
    
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Returns & Refunds</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-medium text-gray-900 mb-4">Our Return Policy</h2>
      
      <div class="space-y-4 text-gray-600">
        <p>At FoodStuff, we want you to be completely satisfied with your purchase. If for any reason you're not happy with your order, we offer a straightforward return and refund process.</p>
        
        <h3 class="text-lg font-medium text-gray-900 mt-6 mb-3">Eligibility for Returns</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>Returns must be initiated within 7 days of delivery</li>
          <li>Items must be in their original packaging and condition</li>
          <li>Perishable food items must not be expired or damaged</li>
          <li>Proof of purchase (order number) is required</li>
        </ul>
        
        <h3 class="text-lg font-medium text-gray-900 mt-6 mb-3">Non-Returnable Items</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>Frozen items that have thawed</li>
          <li>Opened perishable items</li>
          <li>Items past their expiration date</li>
          <li>Specialty items ordered specifically for you</li>
        </ul>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-medium text-gray-900 mb-4">How to Initiate a Return</h2>
      
      <div class="space-y-6">
        <div class="flex">
          <div class="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
            <span class="text-indigo-800 font-bold">1</span>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Contact Customer Support</h3>
            <p class="text-gray-600">Reach out to our support team via live chat or email with your order number and reason for return.</p>
          </div>
        </div>
        
        <div class="flex">
          <div class="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
            <span class="text-indigo-800 font-bold">2</span>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Receive Return Instructions</h3>
            <p class="text-gray-600">Our team will provide you with specific instructions on how to return your items.</p>
          </div>
        </div>
        
        <div class="flex">
          <div class="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
            <span class="text-indigo-800 font-bold">3</span>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Ship the Item Back</h3>
            <p class="text-gray-600">Package the item securely and ship it back to our facility using the provided instructions.</p>
          </div>
        </div>
        
        <div class="flex">
          <div class="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
            <span class="text-indigo-800 font-bold">4</span>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Refund Processing</h3>
            <p class="text-gray-600">Once we receive and inspect the returned item, we'll process your refund within 5-7 business days.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-medium text-gray-900 mb-4">Refund Process</h2>
      
      <div class="space-y-4 text-gray-600">
        <p>Refunds are processed to the original payment method:</p>
        
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Credit/Debit Cards:</strong> 5-7 business days for the refund to appear in your account</li>
          <li><strong>Bank Transfers:</strong> 3-5 business days</li>
          <li><strong>Mobile Money:</strong> 1-2 business days</li>
          <li><strong>Cash on Delivery:</strong> Refund collected by our delivery agent on next delivery</li>
        </ul>
        
        <p class="mt-4"><strong>Note:</strong> Shipping fees are non-refundable unless the return is due to our error.</p>
      </div>
    </div>
    
    <div class="bg-blue-50 rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-3">Need Help with a Return?</h3>
      <p class="text-gray-600 mb-4">Our customer support team is ready to assist you with any return or refund questions.</p>
      <router-link to="/live-chat" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Chat with Support
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>
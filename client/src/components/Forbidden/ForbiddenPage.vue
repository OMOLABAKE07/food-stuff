<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
    <div class="text-center">
      <h1 class="text-7xl font-extrabold text-red-600">403</h1>
      <h2 class="text-2xl font-semibold text-gray-800 mt-4">
        Access Denied
      </h2>
      <p class="text-gray-600 mt-2 max-w-md mx-auto">
        You do not have permission to access this page.  
        Please contact your administrator if you believe this is an error.
      </p>

      <div class="mt-6 flex justify-center gap-4">
        <button
          @click="$router.push('/')"
          class="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
        >
          Go Home
        </button>

        <button
          @click="$router.back()"
          class="px-6 py-2 border border-gray-600 text-gray-700 rounded-md hover:bg-gray-200 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>

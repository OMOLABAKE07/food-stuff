<template>
  <teleport to="body">
    <div 
      v-if="modelValue" 
      class="fixed inset-0 z-50 flex items-center justify-center"
      @click.self="closeModal"
    >
      <div class="fixed inset-0 bg-black/80"></div>
      
      <div 
        class="relative bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
        :class="modalClass"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <h3 v-if="title" class="text-lg font-semibold">
            {{ title }}
          </h3>
          <button 
            @click="closeModal"
            class="text-gray-400 hover:text-gray-500 ml-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Body -->
        <div class="p-4">
          <slot />
        </div>
        
        <!-- Footer -->
        <div v-if="$slots.footer" class="flex items-center justify-end p-4 border-t space-x-2">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  modalClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const closeModal = () => {
  emit('update:modelValue', false)
}
</script>
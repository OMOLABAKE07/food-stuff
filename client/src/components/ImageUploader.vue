<template>
  <div class="space-y-4">
    <div 
      class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-400 transition-colors"
      @drop.prevent="handleDrop"
      @dragover.prevent
      @click="$refs.fileInput.click()"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
      <p class="mt-2 text-sm text-gray-600">
        <span class="font-medium text-indigo-600">Click to upload</span> or drag and drop
      </p>
      <p class="text-xs text-gray-500">
        PNG, JPG, GIF up to 2MB
      </p>
      <input 
        ref="fileInput" 
        type="file" 
        class="hidden" 
        accept="image/*" 
        multiple 
        @change="handleFileSelect"
      >
    </div>
    
    <!-- Preview of uploaded images -->
    <div v-if="images.length > 0" class="grid grid-cols-3 gap-4">
      <div 
        v-for="(image, index) in images" 
        :key="index"
        class="relative group"
      >
        <img 
          :src="image.preview" 
          class="h-24 w-full object-cover rounded-lg"
          alt="Preview"
        >
        <button
          type="button"
          @click="removeImage(index)"
          class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Progress bar for uploads -->
    <div v-if="uploading" class="space-y-2">
      <div class="flex justify-between text-sm text-gray-600">
        <span>Uploading...</span>
        <span>{{ uploadProgress }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
          :style="{ width: uploadProgress + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update:images'])

const images = ref([])
const uploading = ref(false)
const uploadProgress = ref(0)

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  processFiles(files)
}

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files)
  processFiles(files)
}

const processFiles = (files) => {
  // Filter only image files
  const imageFiles = files.filter(file => file.type.startsWith('image/'))
  
  // Create preview URLs
  imageFiles.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      images.value.push({
        file: file,
        preview: e.target.result
      })
      // Emit updated images array
      emit('update:images', images.value.map(img => img.file))
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  images.value.splice(index, 1)
  // Emit updated images array
  emit('update:images', images.value.map(img => img.file))
}

// Simulate upload progress (in a real app, this would be actual upload progress)
const simulateUpload = () => {
  uploading.value = true
  uploadProgress.value = 0
  
  const interval = setInterval(() => {
    uploadProgress.value += 10
    if (uploadProgress.value >= 100) {
      clearInterval(interval)
      uploading.value = false
    }
  }, 200)
}

// Expose method to trigger upload simulation
defineExpose({
  simulateUpload
})
</script>
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Categories</h1>
      <button
        @click="openAddCategoryModal"
        class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Category
      </button>
    </div>

    <!-- Categories Table -->
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Product Categories</h3>
        <p class="mt-1 text-sm text-gray-500">Manage product categories</p>
      </div>
      <div class="border-t border-gray-200">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Name</th>
              <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Created At</th>
              <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="category in categories" :key="category.id">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">
                {{ category.category_name }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ formatDate(category.created_at) }}
              </td>
              <td class="px-6 py-4 text-sm font-medium">
                <button
                  @click="editCategory(category)"
                  class="mr-3 text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  @click="deleteCategory(category)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Category Modal -->
    <div v-if="showCategoryModal">
      <!-- Overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 z-40"
        @click="closeCategoryModal"
      ></div>

      <!-- Modal -->
      <div class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

          <div
            class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{ editingCategory ? 'Edit Category' : 'Add Category' }}
              </h3>

              <form @submit.prevent="saveCategory" class="mt-4 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Category Name
                  </label>
                  <input
                    v-model="categoryForm.category_name"
                    type="text"
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="flex justify-end">
                  <button
                    type="submit"
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>

            <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                @click="closeCategoryModal"
                class="inline-flex justify-center w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'

export default {
  name: 'AdminCategories',
  data() {
    return {
      categories: [],
      showCategoryModal: false,
      editingCategory: null,
      categoryForm: {
        category_name: ''
      }
    }
  },
  async mounted() {
    await this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await api.get('/admin/categories')
        this.categories = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
        try {
          const response = await api.get('/categories')
          this.categories = response.data
        } catch {
          this.categories = []
        }
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    openAddCategoryModal() {
      this.editingCategory = null
      this.categoryForm = { category_name: '' }
      this.showCategoryModal = true
    },
    closeCategoryModal() {
      this.showCategoryModal = false
    },
    editCategory(category) {
      this.editingCategory = category
      this.categoryForm = { ...category }
      this.showCategoryModal = true
    },
    async saveCategory() {
      if (this.editingCategory) {
        await api.put(`/admin/categories/${this.editingCategory.id}`, this.categoryForm)
      } else {
        await api.post('/admin/categories', this.categoryForm)
      }
      this.closeCategoryModal()
      await this.fetchCategories()
    },
    async deleteCategory(category) {
      if (confirm(`Are you sure you want to delete the category "${category.category_name}"?`)) {
        await api.delete(`/admin/categories/${category.id}`)
        await this.fetchCategories()
      }
    }
  }
}
</script>

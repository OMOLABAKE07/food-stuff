import api from './api'

/**
 * Get all products for admin
 * @returns {Promise<Array>}
 */
export const getAdminProducts = async () => {
  try {
    const response = await api.get('/admin/products')
    return response.data
  } catch (error) {
    console.error('Error fetching admin products:', error)
    throw error
  }
}

/**
 * Create a new product
 * @param {Object} productData - The product data to create
 * @returns {Promise<Object>}
 */
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/admin/products', productData)
    return response.data
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

/**
 * Update an existing product
 * @param {number} productId - The ID of the product to update
 * @param {Object} productData - The updated product data
 * @returns {Promise<Object>}
 */
export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/admin/products/${productId}`, productData)
    return response.data
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

/**
 * Delete a product
 * @param {number} productId - The ID of the product to delete
 * @returns {Promise<Object>}
 */
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/admin/products/${productId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

/**
 * Get all orders for admin
 * @returns {Promise<Array>}
 */
export const getAdminOrders = async () => {
  try {
    const response = await api.get('/admin/orders')
    return response.data
  } catch (error) {
    console.error('Error fetching admin orders:', error)
    throw error
  }
}

/**
 * Update order status
 * @param {number} orderId - The ID of the order to update
 * @param {string} status - The new status
 * @returns {Promise<Object>}
 */
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(`/admin/orders/${orderId}/status`, { status })
    return response.data
  } catch (error) {
    console.error('Error updating order status:', error)
    throw error
  }
}

export default {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminOrders,
  updateOrderStatus
}
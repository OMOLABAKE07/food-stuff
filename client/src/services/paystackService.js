import api from './api'

/**
 * Initialize a payment with Paystack
 * @param {number} orderId - The ID of the order to pay for
 * @returns {Promise<Object>} Payment initialization data
 */
export const initializePayment = async (orderId) => {
  try {
    console.log('Initializing payment for order:', orderId);
    const response = await api.post('/payment/initialize', {
      order_id: orderId
    })
    console.log('Payment initialization response:', response.data);
    return response.data
  } catch (error) {
    console.error('Payment initialization failed:', error)
    // Provide more detailed error information
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.message || `Payment initialization failed with status ${error.response.status}`;
      throw new Error(`Server Error: ${errorMessage}`)
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error. Please check your connection and try again.')
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred')
    }
  }
}

/**
 * Verify a payment with Paystack
 * @param {string} reference - The payment reference to verify
 * @returns {Promise<Object>} Payment verification data
 */
export const verifyPayment = async (reference) => {
  try {
    const response = await api.get(`/payment/verify/${reference}`)
    return response.data
  } catch (error) {
    console.error('Payment verification failed:', error)
    throw error
  }
}

export default {
  initializePayment,
  verifyPayment
}
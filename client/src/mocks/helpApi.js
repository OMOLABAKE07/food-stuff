// Mock API for help menu and content
// This simulates what a real API might return

// Mock help menu data
const mockHelpMenu = [
  { label: 'Place an order', path: '/help/place-order' },
  { label: 'Payment options', path: '/help/payment-options' },
  { label: 'Track an order', path: '/help/track-order' },
  { label: 'Cancel an order', path: '/help/cancel-order' },
  { label: 'Returns & Refunds', path: '/help/returns-refunds' },
  { isDivider: true },
  { label: 'Live Chat', path: '/live-chat' }
];

// Mock help topics data
const mockHelpTopics = {
  'place-order': {
    title: 'How to Place an Order',
    description: 'Learn how to browse products and place your first order.',
    steps: [
      {
        number: 1,
        title: 'Browse Products',
        content: 'Visit our products page to browse through our wide selection of food items. You can use the search bar or filter by category to find what you\'re looking for.'
      },
      {
        number: 2,
        title: 'Add to Cart',
        content: 'Click the "Add to Cart" button on any product you wish to purchase. You can adjust quantities in your cart before checkout.'
      },
      {
        number: 3,
        title: 'Proceed to Checkout',
        content: 'Click the cart icon in the top right corner and select "Checkout" to proceed with your order.'
      },
      {
        number: 4,
        title: 'Enter Shipping Information',
        content: 'Fill in your shipping address and contact details. Make sure all information is accurate to ensure timely delivery.'
      },
      {
        number: 5,
        title: 'Complete Payment',
        content: 'Review your order summary and select your preferred payment method to complete the purchase.'
      }
    ]
  },
  'payment-options': {
    title: 'Payment Options',
    description: 'We offer several secure payment options to make your shopping experience convenient and safe.',
    options: [
      {
        title: 'Credit/Debit Cards',
        content: 'Pay with Visa, Mastercard, or other major credit/debit cards. All transactions are secured with SSL encryption.'
      },
      {
        title: 'Bank Transfer',
        content: 'Transfer directly from your bank account. Instructions will be provided during checkout.'
      },
      {
        title: 'Mobile Money',
        content: 'Pay using your mobile money wallet. Available for select countries.'
      },
      {
        title: 'Cash on Delivery',
        content: 'Pay in cash when your order is delivered. Available in select areas.'
      }
    ]
  }
};

// Mock API functions
export const helpApi = {
  // Get help menu items
  getMenuItems: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockHelpMenu;
  },
  
  // Get help topic content
  getTopic: async (topicId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockHelpTopics[topicId] || null;
  },
  
  // Get all help topics
  getAllTopics: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockHelpTopics;
  },
  
  // Update help menu (admin only)
  updateMenu: async (newMenu) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    // In a real API, this would update the database
    console.log('Menu updated:', newMenu);
    return { success: true, message: 'Menu updated successfully' };
  }
};

export default helpApi;
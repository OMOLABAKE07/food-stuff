import helpMenuConfig from '../config/helpMenu';

// Help service to manage help menu items and content dynamically

// Function to get help menu items
export function getHelpMenuItems() {
  // Transform the configuration into the format expected by the UI
  const menuItems = helpMenuConfig.items.map(item => {
    if (item.type === 'divider') {
      return { isDivider: true };
    }
    
    return {
      label: item.label,
      path: item.path
    };
  });
  
  // In a real application, this could fetch from an API
  return Promise.resolve(menuItems);
}

// Function to get help topic content
export function getHelpTopic(topicId) {
  // In a real application, this could fetch from an API
  // For now, we'll return static content based on the topic ID
  const topicContent = {
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
    },
    'track-order': {
      title: 'Track Your Order',
      description: 'Find out how to track your order status and delivery.',
      steps: [
        {
          number: 1,
          title: 'Log Into Your Account',
          content: 'Sign in to your FoodStuff account using your email and password.'
        },
        {
          number: 2,
          title: 'Go to "My Orders"',
          content: 'Navigate to the "My Orders" section from the main menu or your account dashboard.'
        },
        {
          number: 3,
          title: 'Select Your Order',
          content: 'Find the order you want to track and click on it to view detailed information.'
        },
        {
          number: 4,
          title: 'View Tracking Information',
          content: 'You\'ll see the current status of your order, estimated delivery time, and tracking number if applicable.'
        }
      ],
      statuses: [
        {
          title: 'Processing',
          description: 'Your order has been received and is being prepared for shipment.',
          color: 'indigo'
        },
        {
          title: 'Shipped',
          description: 'Your order has been shipped and is on its way to you.',
          color: 'yellow'
        },
        {
          title: 'Out for Delivery',
          description: 'Your order is out for delivery and will arrive soon.',
          color: 'green'
        },
        {
          title: 'Delivered',
          description: 'Your order has been successfully delivered.',
          color: 'blue'
        }
      ]
    },
    'cancel-order': {
      title: 'Cancel an Order',
      description: 'Learn how to cancel your order before it ships.',
      steps: [
        {
          number: 1,
          title: 'Check Order Status',
          content: 'Log into your account and go to "My Orders" to check the current status of your order.'
        },
        {
          number: 2,
          title: 'Eligibility for Cancellation',
          content: 'Orders can only be cancelled if they are still in the "Processing" status. Once an order has been shipped, it cannot be cancelled.'
        },
        {
          number: 3,
          title: 'Contact Customer Support',
          content: 'If your order is eligible for cancellation, contact our customer support team through live chat or email with your order number.'
        },
        {
          number: 4,
          title: 'Confirmation',
          content: 'Our team will process your cancellation request and send you a confirmation email once it\'s completed.'
        }
      ],
      notes: [
        'Cancellations are not possible for orders that have already been shipped',
        'Refunds for cancelled orders will be processed within 5-7 business days',
        'You\'ll receive a confirmation email once your cancellation is processed',
        'If you paid by credit/debit card, the refund will be credited to the same card'
      ]
    },
    'returns-refunds': {
      title: 'Returns & Refunds',
      description: 'Understand our return policy and refund process.',
      eligibility: [
        'Returns must be initiated within 7 days of delivery',
        'Items must be in their original packaging and condition',
        'Perishable food items must not be expired or damaged',
        'Proof of purchase (order number) is required'
      ],
      nonReturnable: [
        'Frozen items that have thawed',
        'Opened perishable items',
        'Items past their expiration date',
        'Specialty items ordered specifically for you'
      ],
      process: [
        {
          number: 1,
          title: 'Contact Customer Support',
          content: 'Reach out to our support team via live chat or email with your order number and reason for return.'
        },
        {
          number: 2,
          title: 'Receive Return Instructions',
          content: 'Our team will provide you with specific instructions on how to return your items.'
        },
        {
          number: 3,
          title: 'Ship the Item Back',
          content: 'Package the item securely and ship it back to our facility using the provided instructions.'
        },
        {
          number: 4,
          title: 'Refund Processing',
          content: 'Once we receive and inspect the returned item, we\'ll process your refund within 5-7 business days.'
        }
      ],
      refundInfo: [
        {
          method: 'Credit/Debit Cards',
          time: '5-7 business days for the refund to appear in your account'
        },
        {
          method: 'Bank Transfers',
          time: '3-5 business days'
        },
        {
          method: 'Mobile Money',
          time: '1-2 business days'
        },
        {
          method: 'Cash on Delivery',
          time: 'Refund collected by our delivery agent on next delivery'
        }
      ]
    }
  };

  return Promise.resolve(topicContent[topicId] || null);
}

// Function to get all help topics
export function getAllHelpTopics() {
  // In a real application, this could fetch from an API
  return Promise.resolve({
    'place-order': {
      title: 'Place an order',
      description: 'Learn how to browse products and place your first order.',
      path: '/help/place-order',
      action: 'View guide'
    },
    'payment-options': {
      title: 'Payment options',
      description: 'Discover all the payment methods we support.',
      path: '/help/payment-options',
      action: 'View options'
    },
    'track-order': {
      title: 'Track an order',
      description: 'Find out how to track your order status and delivery.',
      path: '/help/track-order',
      action: 'Track now'
    },
    'cancel-order': {
      title: 'Cancel an order',
      description: 'Learn how to cancel your order before it ships.',
      path: '/help/cancel-order',
      action: 'Learn more'
    },
    'returns-refunds': {
      title: 'Returns & Refunds',
      description: 'Understand our return policy and refund process.',
      path: '/help/returns-refunds',
      action: 'Read policy'
    },
    'live-chat': {
      title: 'Live Chat',
      description: 'Chat with our customer support team in real-time.',
      path: '/live-chat',
      action: 'Start chat'
    }
  });
}

// Function to update help menu configuration (for admin use)
export function updateHelpMenuConfig(newConfig) {
  // In a real application, this would make an API call to update the configuration
  console.log('Updating help menu configuration:', newConfig);
  return Promise.resolve({ success: true });
}

export default {
  getHelpMenuItems,
  getHelpTopic,
  getAllHelpTopics,
  updateHelpMenuConfig
};
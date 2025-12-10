// Help menu configuration
// This file contains the default help menu structure that can be overridden by API data

export const helpMenuConfig = {
  title: 'Help Center',
  items: [
    {
      id: 'place-order',
      label: 'Place an order',
      path: '/help/place-order',
      icon: 'shopping-cart',
      description: 'Learn how to browse products and place your first order'
    },
    {
      id: 'payment-options',
      label: 'Payment options',
      path: '/help/payment-options',
      icon: 'credit-card',
      description: 'Discover all the payment methods we support'
    },
    {
      id: 'track-order',
      label: 'Track an order',
      path: '/help/track-order',
      icon: 'location-marker',
      description: 'Find out how to track your order status and delivery'
    },
    {
      id: 'cancel-order',
      label: 'Cancel an order',
      path: '/help/cancel-order',
      icon: 'x-circle',
      description: 'Learn how to cancel your order before it ships'
    },
    {
      id: 'returns-refunds',
      label: 'Returns & Refunds',
      path: '/help/returns-refunds',
      icon: 'refresh',
      description: 'Understand our return policy and refund process'
    },
    {
      type: 'divider'
    },
    {
      id: 'live-chat',
      label: 'Live Chat',
      path: '/live-chat',
      icon: 'chat',
      description: 'Chat with our customer support team in real-time',
      highlight: true
    }
  ]
};

export default helpMenuConfig;
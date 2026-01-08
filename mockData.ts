
import { Supplier, Product, Order, Message } from './types';

export const SUPPLIERS: Supplier[] = [
  { id: 's1', name: 'Fresh Veggies Co.', category: 'Produce', logo: 'https://picsum.photos/seed/veg/100/100', rating: 4.8 },
  { id: 's2', name: 'Prime Meat Cutters', category: 'Meat', logo: 'https://picsum.photos/seed/meat/100/100', rating: 4.9 },
  { id: 's3', name: 'Ocean Direct', category: 'Seafood', logo: 'https://picsum.photos/seed/fish/100/100', rating: 4.7 },
  { id: 's4', name: 'Dairy Dreams', category: 'Dairy', logo: 'https://picsum.photos/seed/milk/100/100', rating: 4.5 },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', supplierId: 's1', name: 'Roma Tomatoes', unit: '5kg Crate', price: 12.50, image: 'https://picsum.photos/seed/tomato/150/150', category: 'Veg' },
  { id: 'p2', supplierId: 's1', name: 'Baby Spinach', unit: '1kg Bag', price: 8.00, image: 'https://picsum.photos/seed/spinach/150/150', category: 'Leafy' },
  { id: 'p3', supplierId: 's1', name: 'Avocados (Hass)', unit: 'Box of 12', price: 24.00, image: 'https://picsum.photos/seed/avo/150/150', category: 'Fruits' },
  { id: 'p4', supplierId: 's2', name: 'Ribeye Steak', unit: 'Per kg', price: 35.00, image: 'https://picsum.photos/seed/steak/150/150', category: 'Beef' },
  { id: 'p5', supplierId: 's2', name: 'Chicken Breast', unit: '5kg Bulk', price: 45.00, image: 'https://picsum.photos/seed/chicken/150/150', category: 'Poultry' },
  { id: 'p6', supplierId: 's4', name: 'Whole Milk', unit: 'Case of 6x2L', price: 18.00, image: 'https://picsum.photos/seed/milk/150/150', category: 'Liquid' },
];

const MOCK_ORDER_1: Order = {
  id: 'ORD-7721',
  supplierId: 's1',
  status: 'Confirmed',
  timestamp: '2024-05-18T10:30:00Z',
  total: 44.50,
  items: [
    { id: 'p1', supplierId: 's1', name: 'Roma Tomatoes', unit: '5kg Crate', price: 12.50, image: 'https://picsum.photos/seed/tomato/150/150', category: 'Veg', quantity: 2 },
    { id: 'p3', supplierId: 's1', name: 'Avocados (Hass)', unit: 'Box of 12', price: 24.00, image: 'https://picsum.photos/seed/avo/150/150', category: 'Fruits', quantity: 1 }
  ]
};

export const MOCK_ORDERS: Order[] = [
  MOCK_ORDER_1,
  {
    id: 'ORD-8832',
    supplierId: 's2',
    status: 'Pending',
    timestamp: '2024-05-19T08:15:00Z',
    total: 35.00,
    items: [
      { id: 'p4', supplierId: 's2', name: 'Ribeye Steak', unit: 'Per kg', price: 35.00, image: 'https://picsum.photos/seed/steak/150/150', category: 'Beef', quantity: 1 }
    ]
  }
];

export const MOCK_CHATS: Record<string, Message[]> = {
  's1': [
    { id: 'm1', senderId: 's1', text: 'Hi Chef! We have extra fresh Avocados today.', type: 'text', timestamp: '09:00 AM' },
    { id: 'm2', senderId: 'user', text: 'Great, I will add some to the order.', type: 'text', timestamp: '09:05 AM' },
    { id: 'm3', senderId: 'user', type: 'order', timestamp: '09:10 AM', orderId: 'ORD-7721', orderData: MOCK_ORDER_1 }
  ],
  's2': [
    { id: 'm4', senderId: 's2', text: 'Order #ORD-8832 confirmed. Out for delivery tomorrow.', type: 'text', timestamp: '10:45 AM' }
  ]
};

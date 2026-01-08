
export type OrderStatus = 'Draft' | 'Pending' | 'Confirmed' | 'Delivered' | 'Cancelled' | 'Disputed';

export interface Supplier {
  id: string;
  name: string;
  category: string;
  logo: string;
  rating: number;
}

export interface Product {
  id: string;
  supplierId: string;
  name: string;
  unit: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  supplierId: string;
  items: CartItem[];
  status: OrderStatus;
  timestamp: string;
  total: number;
}

export interface Message {
  id: string;
  senderId: string;
  text?: string;
  type: 'text' | 'image' | 'voice' | 'order';
  timestamp: string;
  orderId?: string;
  orderData?: Order; // For interactive order cards in chat
  mediaUrl?: string;
}

export interface Dispute {
  itemId: string;
  type: 'Missing' | 'Damaged' | 'Wrong Item' | 'Price Change';
  actualQuantity: number;
  evidencePhoto?: string;
}

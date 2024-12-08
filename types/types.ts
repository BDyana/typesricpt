export type CategoryProps = {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
  isActive: boolean;
};
export type UserProps = {
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  email: string;
  password: string;
};
export type LoginProps = {
  email: string;
  password: string;
};

// Individual Order Item
export interface OrderItem {
  id: string; // Product ID
  vendorId: string;
  qty: number; // Quantity
  salePrice: number; // Sale price per item
  imageUrl: string; // URL to the product image
  title: string; // Product title
}

// Checkout Form Data
export interface CheckoutFormData {
  city: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  paymentMethod: string; // Payment method (e.g., "Credit Card", "PayPal")
  phone: string;
  shippingCost: number; // Shipping cost
  streetAddress: string;
  userId: string; // ID of the user making the order
}

// Create Order Function Input
export interface CreateOrderInput {
  checkoutFormData: CheckoutFormData;
  orderItems: OrderItem[];
}

// Order Entity (Returned from DB)
export interface Order {
  id: string; // Unique identifier for the order
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  country: string;
  shippingCost: number;
  paymentMethod: string;
  orderNumber: string;
  createdAt: string; // ISO string timestamp
  updatedAt: string; // ISO string timestamp
}

// Expanded Order Entity with Items
export interface OrderWithItems extends Order {
  orderItems: OrderItem[];
}

// Create Order Result
export interface CreateOrderResult {
  newOrder: Order;
  newOrderItems: OrderItem[];
  sales: any[]; // Replace `any[]` with a detailed sales type if needed
}

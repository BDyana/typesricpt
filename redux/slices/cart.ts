import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for cart item
interface CartItem {
  id: string;
  title: string;
  salePrice: number;
  qty: number;
  imageUrl: string;
  slug: string;
  vendorId: string;
}

// Get initial state from localStorage if available (only on client side)
const getInitialState = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      return JSON.parse(storedCart);
    }
  }
  return [];
};

const initialState: CartItem[] = getInitialState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, title, salePrice, imageUrl, slug, vendorId } = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        // If the item exists, update the quantity
        existingItem.qty += 1;
      } else {
        // If the item doesn't exist, add it to the cart
        const newItem = {
          id,
          title,
          slug,
          salePrice,
          qty: 1,
          imageUrl,
          vendorId,
        };
        state.push(newItem);
        // Update localStorage with the new state (only on client side)
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(state));
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const cartId = action.payload;
      const newState = state.filter((item) => item.id !== cartId);
      // Update localStorage with the new state (only on client side)
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newState));
      }
      return newState;
    },
    incrementQty: (state, action: PayloadAction<string>) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem) {
        cartItem.qty += 1;
        // Update localStorage with the new state (only on client side)
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(state));
        }
      }
    },
    decrementQty: (state, action: PayloadAction<string>) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;
        // Update localStorage with the new state (only on client side)
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(state));
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQty, decrementQty } =
  cartSlice.actions;
export default cartSlice.reducer;

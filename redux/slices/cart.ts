import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for an individual cart item
interface CartItem {
  id: string;
  title: string;
  salePrice: number;
  qty: number;
  imageUrl: string;
  vendorId: string;
}

// Define the type for the cart state (array of cart items)
type CartState = CartItem[];

// Get initial state from localStorage if available
const initialState: CartState =
  (typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('cart') || '[]')) ||
  [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, title, salePrice, imageUrl, vendorId } = action.payload;
      // Check if the item already exists in the cart
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        // If the item exists, update the quantity
        existingItem.qty += 1;
      } else {
        // If the item doesn't exist, add it to the cart
        const newItem: CartItem = {
          id,
          title,
          salePrice,
          qty: 1,
          imageUrl,
          vendorId,
        };
        state.push(newItem);
      }

      // Update localStorage with the new state
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const cartId = action.payload;
      const newState = state.filter((item) => item.id !== cartId);

      // Update localStorage with the new state
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
        // Update localStorage with the new state
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
        // Update localStorage with the new state
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(state));
        }
      }
    },
  },
});

// Export actions and reducer
export const { addToCart, removeFromCart, incrementQty, decrementQty } =
  cartSlice.actions;
export default cartSlice.reducer;

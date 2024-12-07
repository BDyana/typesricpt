'use client';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// Define the type for an individual cart item
interface CartItem {
  id: string;
  title: string;
  salePrice: number;
  qty: number | null;
  imageUrl: string | null;
  vendorId: string;
}

// Define the type for the cart state (array of cart items)
type CartState = CartItem[];

const cartSlice = createSlice({
  name: 'cart',
  initialState: [], // Start with an empty array
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, title, salePrice, imageUrl, vendorId } = action.payload;

      // Check if the item already exists in the cart
      const existingItem: any = state?.find((item: CartItem) => item.id === id);

      if (existingItem) {
        // If the item exists, update the quantity
        existingItem.qty = (existingItem.qty ?? 0) + 1;
      } else {
        // If the item doesn't exist, add it to the cart
        const newItem = {
          id,
          title,
          salePrice,
          qty: 1,
          imageUrl,
          vendorId,
        } as never;
        state.push(newItem);
      }

      return state;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const cartId = action.payload;
      return state.filter((item: any) => item.id !== cartId);
    },
    incrementQty: (state, action: PayloadAction<string>) => {
      const cartItem: any = state.find(
        (item: any) => item.id === action.payload,
      );
      if (cartItem) {
        cartItem.qty = (cartItem.qty ?? 0) + 1;
      }
      return state;
    },
    decrementQty: (state, action: PayloadAction<string>) => {
      const cartItem: any = state.find(
        (item: any) => item.id === action.payload,
      );
      if (cartItem && cartItem.qty && cartItem.qty > 1) {
        cartItem.qty -= 1;
      }
      return state;
    },
  },
});

// Custom hook to manage cart with localStorage
export const useCart = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const dispatch = useDispatch();

  // Wrapper functions that sync Redux and localStorage
  const addItemToCart = (item: CartItem) => {
    dispatch(addToCart(item));
    setCart([...cart, item]);
  };

  const removeItemFromCart = (id: string) => {
    dispatch(removeFromCart(id));
    setCart(cart.filter((item) => item.id !== id));
  };

  const incrementItemQty = (id: string) => {
    dispatch(incrementQty(id));
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: (item.qty ?? 0) + 1 } : item,
      ),
    );
  };

  const decrementItemQty = (id: string) => {
    dispatch(decrementQty(id));
    setCart(
      cart.map((item) =>
        item.id === id && item.qty && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item,
      ),
    );
  };

  return {
    cart,
    addItemToCart,
    removeItemFromCart,
    incrementItemQty,
    decrementItemQty,
  };
};

// Export actions and reducer
export const { addToCart, removeFromCart, incrementQty, decrementQty } =
  cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for favorite item
interface FavoriteItem {
  id: string;
  title: string;
  description: string;
  salePrice: number;
  qty: number;
  imageUrl: string;
  slug: string;
  vendorId: string;
}

// Get initial state from localStorage if available (only on client side)
const getInitialState = (): FavoriteItem[] => {
  if (typeof window !== 'undefined') {
    const favoriteItem = localStorage.getItem('favorite');
    if (favoriteItem) {
      return JSON.parse(favoriteItem);
    }
  }
  return [];
};

const initialState: FavoriteItem[] = getInitialState();

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const { id, title, salePrice, imageUrl, slug, vendorId, description } =
        action.payload;

      // Check if the item already exists in the favorite
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        // If the item exists, update the quantity
        existingItem.qty += 1;
      } else {
        // If the item doesn't exist, add it to the favorite
        const newItem = {
          id,
          title,
          slug,
          salePrice,
          qty: 1,
          imageUrl,
          vendorId,
          description,
        };
        state.push(newItem);
        // Update localStorage with the new state (only on client side)
        if (typeof window !== 'undefined') {
          localStorage.setItem('favorite', JSON.stringify(state));
        }
      }
    },
    removeFromFavorite: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const newState = state.filter((item) => item.id !== itemId);
      // Update localStorage with the new state (only on client side)
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorite', JSON.stringify(newState));
      }
      return newState;
    },
    incrementQty: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const favoriteItem = state.find((item) => item.id === itemId);
      if (favoriteItem) {
        favoriteItem.qty += 1;
        // Update localStorage with the new state (only on client side)
        if (typeof window !== 'undefined') {
          localStorage.setItem('favorite', JSON.stringify(state));
        }
      }
    },
    decrementQty: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const favoriteItem = state.find((item) => item.id === itemId);
      if (favoriteItem && favoriteItem.qty > 1) {
        favoriteItem.qty -= 1;
        // Update localStorage with the new state (only on client side)
        if (typeof window !== 'undefined') {
          localStorage.setItem('favorite', JSON.stringify(state));
        }
      }
    },
  },
});

export const { addToFavorite, removeFromFavorite, incrementQty, decrementQty } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;

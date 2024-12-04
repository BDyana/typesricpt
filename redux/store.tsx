// Create the Store

import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cart';
import checkoutSlice from './slices/checkout';
import onboardingSlice from './slices/onboarding';

const store = configureStore({
  reducer: {
    // Slices go here
    cart: cartSlice,
    checkout: checkoutSlice,
    onboarding: onboardingSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

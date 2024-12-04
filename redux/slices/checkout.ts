import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the checkout form data
interface CheckoutFormData {
  [key: string]: any; // Use specific keys if known, e.g., { name: string; email: string }
}

// Define the type for the checkout state
interface CheckoutState {
  currentStep: number;
  checkoutFormData: CheckoutFormData;
}

// Define the initial state
const initialState: CheckoutState = {
  currentStep: 1,
  checkoutFormData: {},
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateCheckoutFormData: (
      state,
      action: PayloadAction<Partial<CheckoutFormData>>,
    ) => {
      state.checkoutFormData = {
        ...state.checkoutFormData,
        ...action.payload,
      };
    },
  },
});

// Export actions and reducer
export const { setCurrentStep, updateCheckoutFormData } = checkoutSlice.actions;
export default checkoutSlice.reducer;

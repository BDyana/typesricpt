import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the onboarding form data
interface OnboardingFormData {
  [key: string]: any; // Use specific keys if known, e.g., { username: string; email: string }
}

// Define the type for the onboarding state
interface OnboardingState {
  currentStep: number;
  onboardingFormData: OnboardingFormData;
}

// Define the initial state
const initialState: OnboardingState = {
  currentStep: 1,
  onboardingFormData: {},
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateOnboardingFormData: (
      state,
      action: PayloadAction<Partial<OnboardingFormData>>,
    ) => {
      state.onboardingFormData = {
        ...state.onboardingFormData,
        ...action.payload,
      };
    },
  },
});

// Export actions and reducer
export const { setCurrentStep, updateOnboardingFormData } =
  onboardingSlice.actions;
export default onboardingSlice.reducer;

import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/hooks/hooks';
import { setCurrentStep } from '@/redux/slices/checkout';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CheckOutNavButtons() {
  const currentStep = useAppSelector((store) => store.checkout.currentStep);
  const dispatch = useDispatch();
  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }
  return (
    <div className="flex justify-between gap-4 items-center">
      {currentStep > 1 && (
        <button
          onClick={handlePrevious}
          type="button"
          className="inline-flex w-full justify-center items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 hover:bg-slate-800"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>
      )}
      <button
        type="submit"
        className="inline-flex w-full justify-center items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 hover:bg-slate-800 dark:bg-lime-600"
      >
        <span>Next</span>
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
}

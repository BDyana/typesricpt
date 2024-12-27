'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Info, X } from 'lucide-react';

export function PaymentMethodSelector() {
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handleCheckboxChange = (value: string) => {
    if (value === paymentMethod) {
      return; // Prevent unchecking the current selection
    }
    if (value === 'card') {
      toast(
        <div role="alert">
          <div className="flex items-start gap-4">
            <span className="text-blue-600">
              <Info className="size-6" />
            </span>

            <div className="flex-1">
              <strong className="block font-medium text-gray-900">
                {' '}
                Sorry, we currently don't support card!{' '}
              </strong>

              <p className="mt-1 text-sm text-gray-700">
                Our team is working hand in hand to support this feature. please
                bare with us{' '}
              </p>
            </div>
          </div>
        </div>,
      );
      return;
    }
    setPaymentMethod(value);
  };

  return (
    <div className="space-y-4 mt-4">
      <Label>
        Select Payment Method
        <span className="text-red-500">*</span>
      </Label>{' '}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="card"
          checked={paymentMethod === 'card'}
          onCheckedChange={() => handleCheckboxChange('card')}
        />
        <Label htmlFor="card">Pay With Card</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="cash"
          checked={paymentMethod === 'cash'}
          onCheckedChange={() => handleCheckboxChange('cash')}
        />
        <Label htmlFor="cash">Cash On Delivery</Label>
      </div>
    </div>
  );
}

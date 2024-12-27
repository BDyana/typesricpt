'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Truck } from 'lucide-react';

interface DeliveryOption {
  id: string;
  label: string;
  basePrice: number;
  additionalPricePerKg?: number;
  isOil?: boolean;
  description?: string;
}

const deliveryOptions: DeliveryOption[] = [
  {
    id: 'inside-dhaka',
    label: 'Inside Dhaka',
    basePrice: 50,
    additionalPricePerKg: 15,
    description: '৳ 15 Added Next Per Kg',
  },
  {
    id: 'outside-dhaka',
    label: 'Outside Dhaka',
    basePrice: 110,
    additionalPricePerKg: 20,
    description: '৳ 20 Added Next Per Kg',
  },
  {
    id: 'oil-inside',
    label: 'Special Item : Oil (5 Liter)',
    basePrice: 90,
    isOil: true,
    description: '(Inside Dhaka)',
  },
  {
    id: 'oil-outside',
    label: 'Special Item : Oil (5 Liter)',
    basePrice: 150,
    isOil: true,
    description: '(Outside Dhaka)',
  },
];

interface DeliveryChargeSelectorProps {
  onSelect: (option: DeliveryOption | null) => void;
  selectedOptionId?: string;
  weight?: number;
  required?: boolean;
  error?: boolean;
}

export default function DeliveryOption({
  onSelect,
  selectedOptionId,
  weight = 1,
  required,
  error,
}: DeliveryChargeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: string) => {
    const option = deliveryOptions.find((opt) => opt.id === id);
    if (option) {
      // Calculate total price based on weight for non-oil items
      if (!option.isOil && option.additionalPricePerKg && weight > 1) {
        const additionalWeight = weight - 1;
        option.basePrice += additionalWeight * option.additionalPricePerKg;
      }
      onSelect(option);
    } else {
      onSelect(null);
    }
    setIsOpen(false);
  };

  const selectedOption = deliveryOptions.find(
    (opt) => opt.id === selectedOptionId,
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between ${error ? 'border-red-500' : ''}`}
        >
          {selectedOption ? (
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              {selectedOption.label} - ৳{selectedOption.basePrice}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Select Delivery Option
              {required && <span className="text-red-500">*</span>}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Delivery Option</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 pt-4">
          {deliveryOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-start space-x-4 rounded-lg border p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleSelect(option.id)}
            >
              <Checkbox
                id={option.id}
                checked={selectedOptionId === option.id}
                onCheckedChange={() => handleSelect(option.id)}
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor={option.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </Label>
                  <span className="text-sm font-medium">
                    ৳{option.basePrice}
                  </span>
                </div>
                {option.description && (
                  <p className="text-sm text-gray-500">{option.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

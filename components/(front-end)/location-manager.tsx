'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Pencil, Plus } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import CustomText from '../re-usable-inputs/text-reusable';

export function LocationManager({ userProfile }: any) {
  const [locations, setLocations] = useLocalStorage<any[]>('locations', []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingLocation, setEditingLocation] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Initialize locations with user profile data
  useEffect(() => {
    if (userProfile && locations.length === 0 && !isInitialized) {
      const defaultLocation = {
        id: Date.now().toString(), // Add unique ID
        city: userProfile.city || '',
        country: userProfile.country || '',
        streetAddress: userProfile.streetAddress || '',
        district: userProfile.district || '',
        phone: userProfile.phone || '',
        isDefault: true,
      };
      setLocations([defaultLocation]);
      setIsInitialized(true);
    }
  }, [userProfile, locations.length, setLocations, isInitialized]);

  const onSubmit = useCallback(
    async (data: any) => {
      setIsSubmitting(true);
      try {
        if (editingLocation) {
          const updatedLocations = locations.map((loc) =>
            loc.id === editingLocation.id ? { ...loc, ...data } : loc,
          );
          setLocations(updatedLocations);
          setEditingLocation(null);
          setIsEditDialogOpen(false);
        } else {
          const newLoc = {
            ...data,
            id: Date.now().toString(),
            isDefault: locations.length === 0,
          };
          setLocations([...locations, newLoc]);
          setIsDialogOpen(false);
        }
        reset();
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [editingLocation, locations, setLocations, reset],
  );

  const handleEditLocation = useCallback(
    (location: any) => {
      setEditingLocation(location);
      Object.keys(location).forEach((key) => {
        setValue(key, location[key]);
      });
      setIsEditDialogOpen(true);
    },
    [setValue],
  );

  const handleSetDefault = useCallback(
    (locationId: string) => {
      setLocations(
        locations.map((loc) => ({
          ...loc,
          isDefault: loc.id === locationId,
        })),
      );
    },
    [locations, setLocations],
  );

  return (
    <div className="space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add Location
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Location</DialogTitle>
            <DialogDescription>
              Enter the details of your new delivery location here.
            </DialogDescription>
          </DialogHeader>
          <LocationForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>
              Update the details of your delivery location here.
            </DialogDescription>
          </DialogHeader>
          <LocationForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      <div className="space-y-2">
        {locations.map((location) => (
          <div
            key={location.id}
            className="flex items-center space-x-2 border p-2 rounded"
          >
            <Checkbox
              id={`checkbox-${location.id}`}
              checked={location.isDefault}
              onCheckedChange={() => handleSetDefault(location.id)}
            />
            <Label htmlFor={`checkbox-${location.id}`} className="flex-grow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {location.city}, {location.country} - {location.district}
                  </p>
                  <p className="text-sm text-gray-500">
                    {location.streetAddress}
                  </p>
                </div>
                {location.isDefault && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditLocation(location)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function LocationForm({ onSubmit, register, errors, isSubmitting }: any) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomText
          label="City"
          name="city"
          register={register}
          errors={errors}
          type="text"
          className="mb-4"
          placeholder="New York"
        />
        <CustomText
          label="Country"
          name="country"
          register={register}
          errors={errors}
          type="text"
          className="mb-4"
          placeholder="United States"
        />
      </div>

      <CustomText
        label="Phone"
        name="phone"
        register={register}
        errors={errors}
        type="tel"
        className="mb-4"
        placeholder="+12345678"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomText
          label="District"
          name="district"
          register={register}
          errors={errors}
          type="text"
          className="mb-4"
          placeholder="Manhattan"
        />
        <CustomText
          label="Street Address"
          name="streetAddress"
          register={register}
          errors={errors}
          type="text"
          className="mb-4"
          placeholder="123 Main St"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full transition-all duration-200 ease-in-out hover:bg-primary/90"
      >
        {isSubmitting ? 'Saving...' : 'Save Location'}
      </Button>
    </form>
  );
}

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
import { Pencil, Plus, MapPin, Router } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomText from '../re-usable-inputs/text-reusable';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function LocationManager({ userProfile }: any) {
  const [locations, setLocations] = useLocalStorage<any[]>('locations', []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingLocation, setEditingLocation] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

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
        name: `${userProfile.firstName} ${userProfile.lastName}` || '',
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
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
      } finally {
        router.refresh();
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
        <div className="flex justify-between items-center bg-gradient-to-r from-primary/10 to-primary/5 p-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <div>
            <p className="text-lg font-semibold text-brandBlack m-0">
              Delivery Information
            </p>
            <h4 className="m-0">Provide your delivery details below.</h4>
            </div>
          </div>
          <div>
            <span className="size-20">
            </span>
            <div className="relative flex">
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="z-10 text-sm font-normal px-2 h-8 border-sky-300"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add
                </Button>
              </DialogTrigger>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-sm bg-sky-400 opacity-75"></span>
            </div>
          </div>
        </div>
        <DialogContent className="">
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

      <div className="space-y-2 border m-2">
        {locations.map((location, i) => (
          <div
            key={i}
            className="flex items-center space-x-2 pb-2"
          >
            <Checkbox
              id={`checkbox-${location.id}`}
              className="hidden"
              checked={location.isDefault}
              onCheckedChange={() => handleSetDefault(location.id)}
            />
            <Label htmlFor={`checkbox-${location.id}`} className="flex-grow">
              <div className="flex justify-between relative">
                <div>
                  {location.isDefault && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 inline-flex mt-2 rounded">
                      ACTIVE
                    </span>
                  )}
                  <div className="flex gap-2 mt-1.5">
                    <div className="text-nowrap">
                      <p className="font-medium">Name</p>
                      <p className="font-medium my-0.5">Phone No</p>
                      <p className="font-medium">Address</p>
                    </div>
                    <div>
                      <div className="flex gap-1">
                        : <p>{location.name}</p>
                      </div>
                      <div className="flex gap-1">
                        : <p className="my-0.5">{location.phone}</p>
                      </div>
                      <div className="flex gap-1">
                        :{' '}
                        <p className="text-sm font-normal text-gray-500">
                          {location.streetAddress}, {location.city},{' '}
                          {location.district}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleEditLocation(location)}
                  >
                    <Pencil size="12" className="text-gray-500 w-1 h-1 mr-1" />
                    Edit
                  </Button>
                  {/* <Button variant="ghost" size="xs">
                        <Trash2 className="h-1 w-1 text-red-700" />
                      </Button> */}
                </div>
              </div>
            </Label>
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
          label="Full Name"
          name="name"
          register={register}
          errors={errors}
          type="text"
          className="mb-4"
          placeholder="Your Name"
        />
        <CustomText
          label="Phone"
          name="phone"
          register={register}
          errors={errors}
          type="tel"
          className="mb-4"
          placeholder="01711-123456"
        />
      </div>
      <CustomText
        label="Street Address"
        name="streetAddress"
        register={register}
        errors={errors}
        type="text"
        className="mb-4"
        placeholder="House No, Road No, Thana, Upazila/City.."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomText
          label="City"
          name="city"
          register={register}
          errors={errors}
          type="text"
          className="mb-4"
          placeholder="Dhaka City"
        />
        <CustomText
          label="District"
          name="district"
          register={register}
          errors={errors}
          type="text"
          className="mb-4"
          placeholder="Dhaka"
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

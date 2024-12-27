'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CustomText from '../re-usable-inputs/text-reusable';
import { toast } from 'sonner';
import { updateUserProfile } from '@/actions/update-profile';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useSession } from 'next-auth/react';

export default function OnboardingForm(userProfile: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [onBoarded, setOnBoarded] = useLocalStorage('onBoarded', false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    if (userProfile?.isOnBoarded || onBoarded) {
      setOnBoarded(true);
      router.push('/');
    }
  }, [session, userProfile, onBoarded, router]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: userProfile?.city || '',
      country: userProfile?.country || '',
      phone: userProfile?.phone || '',
      district: userProfile?.district || '',
      streetAddress: userProfile?.streetAddress || '',
    },
  });

  async function onSubmit(data: any) {
    try {
      setIsSubmitting(true);
      const result = await updateUserProfile(data);

      if (result.success === true) {
        setOnBoarded(true);
        toast.success(`${result.message}`);
        router.push('/');
        reset();
      } else {
        toast.error(`${result.error}`);
      }
    } catch (error) {
      console.log('Error:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!session) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold">
          Complete Your Profile
        </CardTitle>
        <CardDescription className="text-zinc-500">
          Please provide your location details to complete the onboarding
          process.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            label="Phone Number"
            name="phone"
            register={register}
            errors={errors}
            type="phone"
            className="mb-4"
            placeholder="+1234567890"
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
            />{' '}
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
            {isSubmitting ? 'Submitting...' : 'Complete Onboarding'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

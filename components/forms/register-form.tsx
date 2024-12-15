'use client';

import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import CustomText from '../re-usable-inputs/text-reusable';
import { Button } from '../ui/button';

export default function RegisterForm({ role = 'USER' }) {
  const router = useRouter(); // Redirecting on the client side
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState('');

  async function onSubmit(data: any) {
    try {
      setLoading(true);
      const finalRole = role;
      const finalData = {
        ...data,
        plan: plan,
        role: finalRole,
      };

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success('User Created Successfully');
        reset();
        setLoading(false);

        if (role === 'USER') {
          router.push('/login');
        }
        // else {
        //   const { data } = responseData;
        //   router.push(`/verify-email?userId=${data.id}`);
        // }
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailErr('User with this Email already exists');
          toast.error('User with this Email already exists');
        } else {
          toast.error('Oops! Something went wrong');
        }
      }
    } catch (error) {
      setLoading(false);
      console.log('Error;');
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Create Your Account
      </h2>

      <CustomText
        label="Your Full Name"
        name="name"
        register={register}
        errors={errors}
        type="text"
        className="mb-4"
        placeholder="Enter your full name"
      />

      <CustomText
        label="Email Address"
        name="email"
        register={register}
        errors={errors}
        type="email"
        className="mb-4"
        placeholder="Enter your email"
      />
      {emailErr && (
        <small className="text-red-600 -mt-2 mb-2 block">{emailErr}</small>
      )}

      <CustomText
        label="Password"
        name="password"
        register={register}
        errors={errors}
        type="password"
        className="mb-4"
        placeholder="Create a password"
      />

      <Button
        type="submit"
        className="w-full py-2 px-4 bg-brandBlack text-white font-semibold rounded-md hover:bg-brandColor transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Registering...
          </div>
        ) : (
          'Register'
        )}
      </Button>

      <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="hover:underline text-brandColor">
            Login
          </Link>
        </p>
        {role === 'USER' ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Are you a Seller?{' '}
            <Link
              href="/farmer-pricing"
              className="text-brandColor hover:underline dark:text-brandColor"
            >
              Register here
            </Link>
          </p>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Are you a User?{' '}
            <Link href="/register" className="text-brandColor hover:underline">
              Register here
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}

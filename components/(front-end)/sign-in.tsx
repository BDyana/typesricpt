'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/constants/site';
import { Facebook, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import CustomText from '../re-usable-inputs/text-reusable';

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const [loggingIn, setLoggingIn] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormData>({});

  const router = useRouter();

  async function onSubmit(data: SignInFormData) {
    console.log(data);
    try {
      setLoggingIn(true);
      console.log('Attempting to sign in with credentials:', data);
      const loginData = await signIn('credentials', {
        ...data,
        redirect: false,
      });
      console.log('SignIn response:', loginData);
      if (loginData?.error) {
        toast.error('Sign-in error: Check your credentials');
      } else {
        // Sign-in was successful
        toast.success('Login Successful');
        reset();
        router.push('/');
      }
    } catch (error) {
      console.error('Network Error:', error);
      toast.error('Its seems something is wrong with your Network');
    } finally {
      setLoggingIn(false);
    }
  }

  return (
    <Card className="w-full max-w-[450px] bg-brandBlack border-brandBorder">
      <CardContent className="pt-8 px-8 pb-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="w-24 h-24 bg-brandColors rounded-xl flex items-center justify-center">
            <Link href="/" prefetch={true}>
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={200}
                height={200}
                className="w-24 h-6 invert text-white"
              />
            </Link>
          </div>

          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-semibold text-white">
              Sign in to {siteConfig.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome back! Please sign in to continue
            </p>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={() => signIn('facebook', { callbackUrl: '/' })}
              className="flex-1 bg-transparent border-brandBorder hover:text-white hover:bg-brandBorder text-white"
            >
              <Facebook className="mr-2 h-4 w-4 text-blue-500" />
              Facebook
            </Button>
            <Button
              variant="outline"
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="flex-1 bg-transparent border-brandBorder hover:bg-brandBorder hover:text-white text-white"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </div>

          <div className="w-full flex items-center gap-2">
            <div className="h-px flex-1 bg-brandBorder" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-brandBorder" />
          </div>

          {/* Email Input */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
            <CustomText
              register={register}
              errors={errors}
              name="email"
              label="Email address"
              type="email"
              className="w-full text-white"
              placeholder="Enter your email"
            />
            <CustomText
              register={register}
              errors={errors}
              name="password"
              label="Password"
              type="password"
              className="w-full text-white"
              placeholder="********"
            />
            {/* Continue Button */}
            <Button className="w-full bg-brandColor hover:bg-brandColor/90 text-white">
              Continue
              {loggingIn ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <span className="ml-2">→</span>
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-sm text-muted-foreground">
            Forgot password?{' '}
            <Link
              href="/reset-password"
              className="text-brandColor hover:underline"
            >
              Rest It Now
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/register" className="text-brandColor hover:underline">
              Sign up
            </Link>
          </div>

          {/* Developer Branding */}
          {/* <div className="text-xs text-muted-foreground flex items-center gap-2">
            Secured by
            <Link
              target="blank"
              href="https://mosespace.com"
              className="underline decoration-brandColor/80 text-white hover:decoration-brandColor"
            >
              @mosespace
            </Link>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}

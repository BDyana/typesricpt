'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { getUserById } from './users';
import { db } from '@/lib/db';
import { splitFullName } from '@/lib/splitNames';

const prisma = new PrismaClient();

type UserProfileUpdate = {
  firstName?: string;
  lastName?: string;
  phone: string;
  streetAddress: string;
  city: string;
  country: string;
  district: string;
};

export async function updateUserProfile(data: UserProfileUpdate) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { success: false, error: 'Not authenticated' };
    }

    const userId = session.user.id;
    const fullName = session.user.name;

    const { firstName, secondName } = splitFullName(fullName);

    const updatedProfile = await prisma.userProfile.upsert({
      where: { userId: userId },
      update: {
        ...data,
        firstName: firstName,
        lastName: secondName,
        isOnBoarded: true,
      },
      create: {
        ...data,
        firstName: firstName,
        lastName: secondName,
        userId: userId,
        isOnBoarded: true,
      },
    });

    revalidatePath('/onboarding');
    return {
      success: true,
      profile: updatedProfile,
      message: 'Your Profile has been updated',
    };
  } catch (error) {
    console.error('Failed to update user profile:', error);
    return { success: false, error: 'Failed to update profile' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserProfile(userId: string) {
  try {
    const existingUser = await getUserById(userId);

    if (!existingUser) {
      return {
        data: null,
        status: 404,
        message: `User with userId:${userId} doesn't exist in our database`,
      };
    }

    const profile = await db.userProfile.findUnique({
      where: {
        userId,
      },
    });

    return {
      data: profile,
      status: 201,
      message: 'Profile fetched Back Successfully',
    };
  } catch (error) {
    console.log('Error:', error);
  }
}

'use server';

import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { UserProps } from '@/types/types';
import { v4 as uuidv4 } from 'uuid';
import base64url from 'base64url';
import { Resend } from 'resend';
import { z } from 'zod';

const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.any(),
  plan: z.string(),
});

export async function createUser(data: UserProps) {
  const { email, password, firstName, lastName, name, phone, image } = data;
  try {
    // Hash the PAASWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return {
        error: `Email already exists`,
        status: 409,
        data: null,
      };
    }
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        // firstName,
        // lastName,
        name,
        // phone,
        // image,
      },
    });
    // revalidatePath("/dashboard/users");
    // console.log(newUser);
    return {
      error: null,
      status: 200,
      data: newUser,
    };
  } catch (error) {
    console.log(error);
    return {
      error: `Something Went wrong, Please try again`,
      status: 500,
      data: null,
    };
  }
}

export async function getKitUsers() {
  const endpoint = process.env.KIT_API_ENDPOINT as string;
  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 0 }, // Revalidate immediately
    });
    const response = await res.json();
    const count = response.count;
    console.log(count);
    return count;
  } catch (error) {
    console.error('Error fetching the count:', error);
    return 0;
  }
}

export async function registerUser(prevState: any, formData: FormData) {
  try {
    // Convert FormData to an object
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
      plan: formData.get('plan'),
    };

    // Validate input
    const validatedFields = RegisterSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Invalid input. Please check your details.',
      };
    }

    const { name, email, password, role, plan } = validatedFields.data;

    // Check if the user Already exists in the db
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        message: `User with email ${email} already exists`,
        errors: { email: ['Email already in use'] },
      };
    }

    // Encrypt the Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random UUID and encode token
    const rawToken = uuidv4();
    const token = base64url.encode(rawToken);

    // Create a User in the DB
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        plan,
        verificationToken: token,
      },
    });

    // Optional: Send verification email
    if (role === 'FARMER') {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const verificationLink = `${process.env.NEXTAUTH_URL}/onboarding/${newUser.id}?token=${token}`;

        await resend.emails.send({
          from: 'Desishub <info@jazzafricaadventures.com>',
          to: email,
          subject: 'Account Verification - Limi Ecommerce',
          html: `
            <p>Hello ${name},</p>
            <p>Thank you for creating an account. Please verify your account:</p>
            <a href="${verificationLink}">Verify Account</a>
          `,
        });
      } catch (emailError) {
        console.error('Verification email failed:', emailError);
      }
    }

    return {
      message: 'User Created Successfully',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      message: 'Server Error: Something went wrong',
      errors: error instanceof Error ? { server: [error.message] } : {},
    };
  }
}

// Separate function for fetching users
export async function getUsers() {
  try {
    const users = await db.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    return {
      message: 'Users fetched successfully',
      data: users,
    };
  } catch (error) {
    console.error('Fetch users error:', error);
    return {
      message: 'Failed to fetch users',
      errors: error instanceof Error ? { server: [error.message] } : {},
    };
  }
}

export async function getFarmers() {
  try {
    const users = await db.user.findMany({
      where: {
        role: 'FARMER',
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        // email: true,
        // role: true,
        // createdAt: true,
      },
    });
    return {
      message: 'Farmers fetched successfully',
      data: users,
    };
  } catch (error) {
    console.error('Fetch farmers error:', error);
    return {
      message: 'Failed to fetch farmers',
      errors: error instanceof Error ? { server: [error.message] } : {},
    };
  }
}

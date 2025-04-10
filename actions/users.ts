'use server';

import EmailTemplate from '@/components/email/email-template';
import { db } from '@/lib/db';
import { UserProps } from '@/types/types';
import base64url from 'base64url';
import bcrypt from 'bcrypt';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.any(),
  plan: z.string(),
});

const ResetPasswordSchema = z.object({
  userId: z.string(),
  token: z.string(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    ),
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
    if (role === 'VENDOR') {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const verificationLink = `${process.env.NEXTAUTH_URL}/onboarding/${newUser.id}?token=${token}`;

        await resend.emails.send({
          from: 'BDyana <info.bdyana@gmail.com>',
          to: email,
          subject: 'Account Verification - BDyana Ecommerce',
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

export async function getVendors() {
  try {
    const users = await db.user.findMany({
      where: {
        role: 'VENDOR',
      },
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
      message: 'Vendors fetched successfully',
      data: users,
    };
  } catch (error) {
    console.error('Fetch vendors error:', error);
    return {
      message: 'Failed to fetch vendors',
      errors: error instanceof Error ? { server: [error.message] } : {},
    };
  }
}

// Get normal users
export async function getNormalUsers() {
  try {
    const users = await db.user.findMany({
      where: {
        role: 'USER',
      },
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
      message: 'Vendors fetched successfully',
      data: users,
    };
  } catch (error) {
    console.error('Fetch vendors error:', error);
    return {
      message: 'Failed to fetch vendors',
      errors: error instanceof Error ? { server: [error.message] } : {},
    };
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}
export async function sendPasswordResetEmail(email: string) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Verify if the user exists
    const existingUser = await db.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true },
    });

    if (!existingUser) {
      return {
        success: false,
        status: 404, // Not Found
        message: `User with email (${email}) does not exist in our database. Please sign up instead.`,
      };
    }

    // Generate a secure reset token and store it in the database
    const rawToken = uuidv4();
    const token = base64url.encode(rawToken);
    const expirationDate = new Date(Date.now() + 60 * 60 * 1000); // Token valid for 1 hour

    await db.passwordResetToken.create({
      data: {
        userId: existingUser.id,
        token,
        expires: expirationDate,
      },
    });

    // Prepare email content
    const baseUrl = process.env.NEXTAUTH_URL;
    const redirectUrl = `${baseUrl}/verify-email?token=${token}&id=${existingUser.id}`;
    const description =
      'Click the link below to reset your password. Thank you.';
    const subject = 'Password Reset - Bdyana.com Ecommerce';

    console.log('Redirect URL ✅:', redirectUrl);

    const emailResult = await resend.emails.send({
      from: 'Bdyana <info@bdyana.com>',
      to: email,
      subject,
      react: EmailTemplate({
        name: existingUser.name as string,
        redirectUrl,
        linkText: 'Reset Password',
        description,
        subject,
      }),
    });

    if (emailResult.error) {
      return {
        success: false,
        status: 500, // Internal Server Error
        message: `Failed to send email: ${emailResult.error.message}`,
      };
    }

    return {
      success: true,
      status: 201, // Created
      message: `Password reset email sent successfully to ${email}. Please check your inbox.`,
    };
  } catch (error) {
    console.error('Send password reset email error:', error);

    // Specific error handling
    if (error instanceof Error) {
      if (error.message.includes('Connection')) {
        return {
          success: false,
          status: 503, // Service Unavailable
          message: 'Database connection error. Please try again later.',
        };
      }

      return {
        success: false,
        status: 500, // Internal Server Error
        message: `An unexpected error occurred: ${error.message}`,
      };
    }

    // Fallback for unexpected cases
    return {
      success: false,
      status: 500,
      message: 'An unknown error occurred during the email sending process.',
    };
  }
}

export async function resetPassword(data: any) {
  const { userId, token, newPassword } = data;
  try {
    // Validate the reset token
    const resetToken = await db.passwordResetToken.findFirst({
      where: {
        userId,
        token,
        expires: { gt: new Date() }, // Ensure token is not expired
      },
    });

    if (!resetToken) {
      return {
        success: false,
        status: 409, // Conflict - invalid token or expired
        message: 'The token you are trying to use might be expired or invalid.',
      };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and optionally verify email
    await db.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        emailVerified: true, // Mark email as verified
      },
    });

    // Delete all reset tokens associated with the user
    await db.passwordResetToken.deleteMany({
      where: { userId },
    });

    return {
      success: true,
      status: 201, // Created - operation successful
      message:
        'Your password has been reset successfully. Please log in again.',
    };
  } catch (error) {
    console.error('Password reset error:', error);

    // Specific error handling
    if (error instanceof Error) {
      if (error.message.includes('Connection')) {
        return {
          success: false,
          status: 503, // Service Unavailable
          message: 'Database connection error. Please try again later.',
        };
      }

      return {
        success: false,
        status: 500, // Internal Server Error
        message: `An unexpected error occurred: ${error.message}`,
      };
    }

    // Fallback for unexpected cases
    return {
      success: false,
      status: 500,
      message: 'An unknown error occurred during the password reset process.',
    };
  }
}

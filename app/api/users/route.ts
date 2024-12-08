import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { Resend } from 'resend';
import base64url from 'base64url';
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';

type UserRole = 'FARMER' | 'CUSTOMER'; // Add other roles as needed
type PlanType = 'BASIC' | 'PREMIUM'; // Add other plans as needed

interface UserRequestBody {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  plan: PlanType;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    console.log('Raw Body 🚀:', rawBody);

    const { name, email, password, role, plan } = JSON.parse(rawBody);

    if (!name || !email || !password || !role || !plan) {
      console.log('Missing fields 🔔:', { name, email, password, role, plan });
      throw new Error('Invalid request body');
    }

    const existingUser = await db.user
      .findUnique({
        where: { email },
      })
      .catch((dbError: unknown) => {
        console.error('Database query error:', dbError);
        throw new Error('Database connection failed');
      });

    if (existingUser) {
      console.log(`User with email ${email} already exists 😢`);
      return NextResponse.json(
        { message: `User with email ${email} already exists` },
        { status: 409 },
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification token
    const rawToken = uuidv4();
    const token = base64url.encode(rawToken);

    // Create the user in the database
    const newUser = await db.user.create({
      data: {
        name,
        email,
        role,
        plan,
        password: hashedPassword,
        verificationToken: token,
      },
    });

    // Optionally, send a verification email if role is "FARMER"
    if (role === 'FARMER') {
      const resend = new Resend(process.env.RESEND_API_KEY!);
      const verificationLink = `${process.env.NEXTAUTH_URL}/onboarding/${newUser.id}?token=${token}`;

      try {
        await resend.emails.send({
          from: 'Desishub <info@jazzafricaadventures.com>',
          to: email,
          subject: 'Account Verification - Limi Ecommerce',
          html: `
            <p>Hello ${name},</p>
            <p>Thank you for creating an account with us. To complete your onboarding process, please verify your account using the link below:</p>
            <a href="${verificationLink}">Verify Account</a>
            <p>Thank you,</p>
            <p>The Limi Ecommerce Team</p>
          `,
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Optionally, delete the user if email sending fails
        // await db.user.delete({ where: { id: newUser.id } });
        return NextResponse.json(
          { message: 'User created, but verification email failed' },
          { status: 207 }, // Partial success status
        );
      }
    }

    // Respond with success
    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 201 },
    );
  } catch (error) {
    console.error('User creation error:', error);
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
        error: String(error),
      },
      { status: 500 },
    );
  }
}

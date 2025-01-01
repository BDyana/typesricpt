import { db } from './db';
import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';

const prismaAdapter = PrismaAdapter(db);

// Modify the createUser function in the adapter
const customAdapter = {
  ...prismaAdapter,
  createUser: async (data: any) => {
    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        emailVerified: data.emailVerified || false,
        role: data.role,
        profile: {
          create: {
            firstName: data.name?.split(' ')[0] || '',
            lastName: data.name?.split(' ').slice(1).join(' ') || '',
            profileImage: data.image || '',
            email: data.email,
          },
        },
      },
    });
    return user;
  },
};

export const authOptions: NextAuthOptions = {
  adapter: customAdapter as any,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    GoogleProvider({
      profile(profile) {
        // console.log('Profile', profile);
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          role: 'USER',
          emailVerified: profile.email_verified,
          image: profile.picture,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      profile(profile) {
        // console.log('Facebook Profile', profile);
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: 'USER',
          emailVerified: profile.email ? true : false,
          image: profile.picture?.data?.url || '',
        };
      },
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jb@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // console.log(
          //   'Authorize function called with credentials:',
          //   credentials,
          // );
          // Check if user credentials are Correct
          if (!credentials?.email || !credentials?.password) {
            throw { error: 'No Inputs Found', status: 401 };
          }
          // console.log('Pass 1 checked ✅');
          //Check if user exists
          const existingUser = await db.user.findUnique({
            where: { email: credentials.email },
          });

          if (!existingUser) {
            // console.log('No user found');
            throw { error: 'No user found', status: 401 };
          }

          // console.log('Pass 2 Checked ✅');
          // console.log(existingUser);
          let passwordMatch: boolean = false;
          //Check if Password is correct
          if (existingUser && existingUser.password) {
            // if user exists and password exists
            passwordMatch = await compare(
              credentials.password,
              existingUser.password,
            );
          }
          if (!passwordMatch) {
            // console.log('Password incorrect');
            throw { error: 'Password Incorrect', status: 401 };
          }
          // console.log('Pass 3 Checked  ✅');
          const user = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
            status: existingUser.status,
            emailVerified: existingUser.emailVerified,
          };
          //
          // console.log('User Compiled ✅');
          // console.log(user);
          return user;
        } catch (error) {
          // console.log('ALL failed from authOptions');
          console.log(error);
          throw { error: 'Something went wrong', status: 401 };
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log('SignIn callback:', { user, account, profile });
      return true;
    },
    async jwt({ token, user, account }) {
      // console.log('JWT callback:', { token, user, account });
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.status = user.status;
        token.image = user.image;
        token.emailVerified = user.emailVerified;
      }
      return token;
    },
    session({ session, token }) {
      // console.log('Session callback', { session, token });
      if (session.user && token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.status = token.status;
        session.user.image = token.image;
        session.user.emailVerified = token.emailVerified;
      }
      return {
        ...session,
        user: session.user || {},
      };
    },
  },
};

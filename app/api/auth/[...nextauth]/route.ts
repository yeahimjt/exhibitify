import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { app } from '@/app/firebase';
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) ?? '',
      clientSecret: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET) ?? '',
    }),
  ],
  adapter: FirestoreAdapter(app),
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

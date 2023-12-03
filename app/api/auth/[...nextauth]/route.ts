import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) ?? '',
      clientSecret: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET) ?? '',
    }),
  ],
});

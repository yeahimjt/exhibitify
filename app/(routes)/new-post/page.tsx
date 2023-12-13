'use client';
import AuthRequired from '@/app/components/authrequired';

import NavBar from '@/app/components/navbar/navbar';
import { auth } from '@/app/firebase';

import { Separator } from '@/components/ui/separator';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostForm from '@/app/components/postform';
const Page = () => {
  // Check if user is logged in
  const [user, loading, error] = useAuthState(auth);

  // Protect route
  if (!user && !loading) {
    return (
      <>
        <NavBar />
        <main className='mt-[92px]'>
          <AuthRequired />
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className='mt-[92px] space-y-4'>
        <h5 className='title'>Create Post</h5>
        <Separator />
        <PostForm type={'new'} />
      </main>
    </>
  );
};

export default Page;

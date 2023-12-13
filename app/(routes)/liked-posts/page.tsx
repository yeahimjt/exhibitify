'use client';
import AuthRequired from '@/app/components/authrequired';
import NavBar from '@/app/components/navbar/navbar';
import PostPreviewContainer from '@/app/components/postpreviewcontainer';
import { auth } from '@/app/firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Page = () => {
  const [user] = useAuthState(auth);
  if (!user) {
    return (
      <>
        <NavBar />
        <main className='mb-[40px] mt-[94px] space-y-4'>
          <AuthRequired />
        </main>
      </>
    );
  }
  return (
    <>
      <NavBar />
      <main className='mb-[40px] mt-[94px] space-y-4'>
        <PostPreviewContainer type={'likes'} />
      </main>
    </>
  );
};

export default Page;

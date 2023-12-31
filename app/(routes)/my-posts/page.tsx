'use client';
import AuthRequired from '@/app/components/authrequired';
import PostPreview from '@/app/components/custom/postpreview';
import NavBar from '@/app/components/navbar/navbar';
import PostPreviewContainer from '@/app/components/postpreviewcontainer';
import { auth } from '@/app/firebase';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
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
        <PostPreviewContainer type={'user'} />
      </main>
    </>
  );
};

export default Page;

'use client';
import AuthRequired from '@/app/components/authrequired';
import NavBar from '@/app/components/navbar/navbar';
import { auth } from '@/app/firebase';
import { updateUserProfile } from '@/app/helper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateCurrentUser, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Page = () => {
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState<string | null>(null);
  if (!user) {
    return (
      <>
        <NavBar />
        <main className='mt-[92px]'>
          <AuthRequired />
        </main>
      </>
    );
  }
  async function handleUpdateUserProfile(
    name: string | null,
    picture: string | null,
    user_id: string
  ) {
    if (!user || !name) return;
    const response = await updateProfile(user, {
      displayName: name,
    });
    updateUserProfile(name, picture, user_id);
  }
  return (
    <>
      <NavBar />
      <main className='mt-[92px]'>
        <div className='component-style mb-[40px] mt-[20px] select-none space-y-4 rounded-[10px] bg-white p-8 dark:bg-dark-accent'>
          <h5 className='title mb-4'>Profile</h5>
          <section className='space-y-4'>
            <div className='space-y-1'>
              <Label>Full Name</Label>
              <Input
                placeholder={user?.displayName || 'Enter your full name'}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className='space-y-1'>
              <Label>Email Address</Label>
              <Input
                disabled
                placeholder={user?.email || 'Enter your full name'}
              />
            </div>
            <div className='flex items-end justify-end'>
              <Button
                onClick={() =>
                  handleUpdateUserProfile(displayName, null, user.uid)
                }
              >
                Update Profile
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Page;

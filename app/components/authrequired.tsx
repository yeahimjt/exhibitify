import { Button } from '@/components/ui/button';
import React from 'react';
import { useRouter } from 'next/navigation';
const AuthRequired = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center space-y-2'>
      <h5 className='text-[24px] text-light-title dark:text-dark-title'>
        This page requires authentication
      </h5>
      <p>To authenticate yourself, create or log into an account.</p>
      <Button
        className=''
        variant={'outline'}
        onClick={() => router.push('/sign-in')}
      >
        Sign In
      </Button>
    </div>
  );
};

export default AuthRequired;

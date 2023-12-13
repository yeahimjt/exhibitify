'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FIREBASE_ERRORS } from '@/app/constants';
import { toast } from '@/components/ui/use-toast';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  // State variables
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [user] = useAuthState(auth);

  const router = useRouter();
  // Auth instance for google
  const [signInWithGoogle, userGoogle, errorGoogle] = useSignInWithGoogle(auth);
  // Users will not be able to submit with empty email or password via required prop in input element
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Sign in success',
        description: 'You have been authenticated',
      });
    } catch (error: any) {
      // error_object is by default an array, however only one object can be returned
      const error_object = FIREBASE_ERRORS.filter(
        (firebase_error) => firebase_error.code === error.code
      );

      toast({
        title: error_object[0].title,
        description: error_object[0].description,
      });
    }
    // Create authenticated user within firebase project
    setIsLoading(false);
  }

  const handleGoogleAuth = async () => {
    // setIsLoading(true);
    await signInWithGoogle();
    // if (errorGoogle) {
    //   setIsLoading(false);
    // }
  };

  React.useEffect(() => {
    if (userGoogle || user) {
      router.push('/');
    }
  }, [userGoogle, user]);
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              Email
            </Label>
            <Input
              id='email'
              placeholder='Your Email Address'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='password'>
              Password
            </Label>
            <Input
              id='password'
              placeholder='Your Password'
              type='password'
              autoCapitalize='none'
              autoComplete='password'
              autoCorrect='off'
              disabled={isLoading}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className='bg-my-accent hover:bg-my-accent/90'
            disabled={isLoading}
            type='submit'
          >
            {isLoading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-light-bg px-2 dark:bg-dark-bg '>
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant='outline'
        type='button'
        disabled={isLoading}
        onClick={() => handleGoogleAuth()}
      >
        {isLoading ? (
          <Loader className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <Image
            src='/images/google.png'
            className='mr-2 p-2'
            width={50}
            height={50}
            alt='google icon'
          />
        )}{' '}
        Google
      </Button>
    </div>
  );
}

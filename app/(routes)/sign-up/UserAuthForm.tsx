'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/app/firebase';
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { updateUserProfile } from '@/app/helper';
import { FirestoreError, doc, setDoc, updateDoc } from 'firebase/firestore';
import { FIREBASE_ERRORS } from '@/app/constants';
import { useToast } from '@/components/ui/use-toast';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  // State variables
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [displayName, setDisplayName] = React.useState<string>('');
  const [user] = useAuthState(auth);
  const router = useRouter();
  // Auth instance for google
  const [signInWithGoogle, userGoogle, errorGoogle] = useSignInWithGoogle(auth);

  const { toast } = useToast();

  // Users will not be able to submit with empty email or password via required prop in input element
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

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

  async function handleDisplayName() {
    // Update local profile
    await updateProfile(user!, { displayName });

    // Update profile in firestore database
    const userDocRef = doc(firestore, 'users', user!.uid);
    await setDoc(
      userDocRef,
      {
        displayName,
      },
      { merge: true }
    );

    router.push('/');
  }

  // When user sign's up, redirect them to home
  React.useEffect(() => {
    if (user) {
      if (!user?.displayName && displayName) {
        handleDisplayName();
      } else {
        router.push('/');
      }
    }
  }, [user]);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='displayName'>
              Full Name
            </Label>
            <Input
              id='displayName'
              placeholder='Enter your full name'
              type='text'
              autoCapitalize='none'
              disabled={isLoading}
              required
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              Email
            </Label>
            <Input
              id='email'
              placeholder='Enter a valid email address'
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
              placeholder='Enter a strong password'
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
            className='bg-my-accent text-white hover:bg-my-accent/90'
            disabled={isLoading}
            type='submit'
          >
            {isLoading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
            Sign Up with Email
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

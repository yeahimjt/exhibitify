import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { UserAuthForm } from './UserAuthForm';
const page = () => {
  return (
    <header className=''>
      <div className='container  relative hidden h-screen min-h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <Link
          href='/sign-in'
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}
        >
          Sign In
        </Link>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-dark-title dark:border-r dark:text-dark-title lg:flex'>
          <div className='absolute inset-0 bg-dark-bg   dark:bg-dark-accent ' />
          <Link
            href='/'
            className='relative z-20 flex w-fit items-center text-lg font-extrabold'
          >
            exhibitify
          </Link>
          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                &ldquo;This application has served as my go-to when I&apos;m
                updating my portfolio, I have found great inspiration
                here.&rdquo;
              </p>
              <footer className='text-sm'>Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>
                Create an account
              </h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email and password to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className='px-8 text-center text-sm text-muted-foreground'>
              By clicking continue, you agree to our{' '}
              <Link
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default page;

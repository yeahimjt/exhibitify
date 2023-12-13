'use client';
import { auth } from '@/app/firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import CtaButton from '../custom/cta';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  BookOpen,
  Heart,
  LogOut,
  Mail,
  Moon,
  MoonIcon,
  PlusIcon,
  Settings,
  Sun,
  User,
  UserIcon,
  UserPlus,
} from 'lucide-react';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const Conditional = () => {
  const [user, isLoading, error] = useAuthState(auth);
  const { theme, setTheme } = useTheme();
  if (user && !isLoading) {
    return (
      <div className='flex items-center gap-4'>
        {theme === 'light' ? (
          <Moon className='cursor-pointer' onClick={() => setTheme('dark')} />
        ) : (
          <Sun className='cursor-pointer' onClick={() => setTheme('light')} />
        )}
        <Link
          href='/new-post'
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'select-none gap-[5px] text-light-reg-text dark:text-dark-reg-text'
          )}
        >
          <PlusIcon className='w-fit' />
          <p>New Post</p>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger
            className='cursor-pointer select-none rounded-full border'
            asChild
          >
            {user && user.displayName && (
              <div className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-200'>
                <h2>{user?.displayName.charAt(0)}</h2>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href='/my-posts'>
                <DropdownMenuItem className='cursor-pointer'>
                  <BookOpen className='mr-2 h-4 w-4' />
                  <span>My Posts</span>
                </DropdownMenuItem>
              </Link>
              <Link href='/liked-posts'>
                <DropdownMenuItem className='cursor-pointer'>
                  <Heart className='mr-2 h-4 w-4' />
                  <span>Liked Posts</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href='/profile'>
                <DropdownMenuItem className='cursor-pointer'>
                  <User className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              {/* <Link href='/settings'>
                <DropdownMenuItem className='cursor-pointer'>
                  <Settings className='mr-2 h-4 w-4' />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link> */}
            </DropdownMenuGroup>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='cursor-default'>
                  <UserPlus className='mr-2 h-4 w-4' />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem className='cursor-pointer'>
                      <Mail className='mr-2 h-4 w-4' />
                      <span>Email</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup> */}
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className='cursor-pointer text-red-500'
              onClick={() => signOut(auth)}
            >
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  } else {
    return (
      <span className='flex items-center space-x-4'>
        {theme === 'light' ? (
          <Moon className='cursor-pointer' onClick={() => setTheme('dark')} />
        ) : (
          <Sun className='cursor-pointer' onClick={() => setTheme('light')} />
        )}
        <CtaButton action='Sign Up' redirect='/sign-up' />
      </span>
    );
  }
};

export default Conditional;

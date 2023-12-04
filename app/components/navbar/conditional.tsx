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
  LogOut,
  Mail,
  MoonIcon,
  Settings,
  Sun,
  User,
  UserPlus,
} from 'lucide-react';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { useTheme } from 'next-themes';

const Conditional = () => {
  const [user, isLoading, error] = useAuthState(auth);
  const { theme, setTheme } = useTheme();
  if (user && !isLoading) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className='cursor-pointer select-none rounded-full border'
          asChild
        >
          <Image
            src={user.photoURL || ''}
            width={45}
            height={45}
            alt='user image'
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className='cursor-pointer'>
              <User className='mr-2 h-4 w-4' />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>
              <Settings className='mr-2 h-4 w-4' />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={() =>
                theme === 'light' ? setTheme('dark') : setTheme('light')
              }
            >
              {theme === 'light' ? (
                <Sun className='mr-2 h-4 w-4' />
              ) : (
                <MoonIcon className='mr-2 h-4 w-4' />
              )}
              <span>Toggle Theme</span>
              <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
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
          </DropdownMenuGroup>
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
    );
  } else {
    return <CtaButton action='Sign Up' redirect='/sign-up' />;
  }
};

export default Conditional;

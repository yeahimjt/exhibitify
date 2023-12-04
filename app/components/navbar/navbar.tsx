import Link from 'next/link';
import React from 'react';
import CtaButton from '../custom/cta';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import Conditional from './conditional';

const NavBar = () => {
  return (
    <nav className=' dark:bg-dark-accent flex w-screen items-center justify-between bg-white py-[20px] shadow-sm'>
      <section className='mx-auto flex w-full max-w-[1024px] items-center justify-between px-[0px]'>
        <section className='flex gap-[30px]'>
          <Link
            href='/'
            className='text-[17px] font-black text-light-title dark:text-dark-title'
          >
            exhibitify
          </Link>
          <span className='flex gap-[30px] text-light-subtitle dark:text-dark-subtitle'>
            <Link
              className='hover:text-light-title dark:hover:text-dark-title'
              href='/explore'
            >
              Explore
            </Link>
            <Link
              className='hover:text-light-title dark:hover:text-dark-title'
              href='/trending'
            >
              Trending
            </Link>
            <Link
              className='hover:text-light-title dark:hover:text-dark-title'
              href='/faq'
            >
              FAQ
            </Link>
          </span>
        </section>
        <Conditional />
      </section>
    </nav>
  );
};

export default NavBar;

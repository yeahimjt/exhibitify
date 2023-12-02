import Link from 'next/link';
import React from 'react';
import CtaButton from './custom/cta';

const NavBar = () => {
  return (
    <nav className='absolute left-0 top-0 flex w-screen items-center justify-between bg-white py-[20px] shadow-sm'>
      <section className='mx-auto flex w-full max-w-[1024px] items-center justify-between px-[40px] lg:px-[0px]'>
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
        <CtaButton action={'Sign Up'} redirect={'/sign-up'} />
      </section>
    </nav>
  );
};

export default NavBar;

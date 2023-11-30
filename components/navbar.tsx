import Link from 'next/link';
import React from 'react';
import CtaButton from './custom/cta';

const NavBar = () => {
  return (
    <nav className='flex items-center justify-between'>
      <section className='flex gap-[30px]'>
        <h5 className='text-light-title dark:text-dark-title text-[17px] font-black'>
          exhibitify
        </h5>
        <span className='text-light-subtitle dark:text-dark-subtitle flex gap-[30px]'>
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
    </nav>
  );
};

export default NavBar;

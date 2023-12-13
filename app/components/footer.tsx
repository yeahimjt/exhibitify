import { Globe, Languages, WholeWord } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='mb-[100px] mt-[200px] flex flex-wrap gap-[140px]'>
      <section className='flex flex-col justify-between gap-[5px]'>
        <span className='flex flex-col gap-[5px]'>
          <h5 className='font-extrabold'>exhibity</h5>
          <span className='flex items-center gap-2'>
            <Globe size={16} />
            <p>United States</p>
          </span>
          <span className='flex items-center gap-2'>
            <Languages size={16} />
            <p>English</p>
          </span>
        </span>
        <span className='flex items-center gap-2'>
          <p className='text-[14px]'>2023</p>
          <p>&copy;</p>
          <p className='text-[14px] font-bold'>exhibitify</p>
        </span>
      </section>
      <section className='flex flex-col gap-[5px]'>
        <p>Navigation</p>
        <a
          className='text-light-less-text dark:text-dark-less-text'
          href='/explore'
        >
          Explore
        </a>
      </section>

      <section className='flex flex-col gap-[5px]'>
        <p>Resources</p>
        <a
          className='text-light-less-text dark:text-dark-less-text'
          href='/faq'
        >
          FAQ
        </a>
      </section>
    </footer>
  );
};

export default Footer;

import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='mb-[100px] mt-[200px] flex flex-wrap gap-[140px]'>
      <section className='flex flex-col justify-between gap-[5px]'>
        <span className='flex flex-col gap-[5px]'>
          <h5 className='font-extrabold'>exhibity</h5>
          <p>United States</p>
          <p>English</p>
        </span>
        <span>
          <p>2023 exhibitify</p>
        </span>
      </section>
      <section className='flex flex-col gap-[5px]'>
        <p>Explore</p>
        <a className='text-light-less-text dark:text-dark-less-text' href=''>
          All
        </a>
        <a className='text-light-less-text dark:text-dark-less-text' href=''>
          Software Engineer
        </a>
        <a className='text-light-less-text dark:text-dark-less-text' href=''>
          Full Stack Developer
        </a>
        <a className='text-light-less-text dark:text-dark-less-text' href=''>
          Front End Engineer
        </a>
        <a className='text-light-less-text dark:text-dark-less-text' href=''>
          Back End Developer
        </a>
      </section>
      <section className='flex flex-col gap-[5px]'>
        <p>Trending</p>
        <a className='text-light-less-text dark:text-dark-less-text' href=''>
          All
        </a>
        <a className='text-light-less-text dark:text-dark-less-text' href=''>
          Software Engineer
        </a>
        <a className='text-light-less-text dark:text-dark-less-text' href=''>
          Full Stack Developer
        </a>
        <a className='text-light-less-text dark:text-dark-less-text' href=''>
          Front End Engineer
        </a>
        <a className='text-light-less-text dark:text-dark-less-text' href=''>
          Back End Developer
        </a>
      </section>
      <section className='flex flex-col gap-[5px]'>
        <p>Resources</p>
        <a className='text-light-less-text dark:text-dark-less-text' href=''>
          FAQ
        </a>
      </section>
    </footer>
  );
};

export default Footer;

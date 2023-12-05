import Image from 'next/image';
import React from 'react';
interface FeatureProps {
  subTitle: string;
  title: String;
  description: String;
  imageURL: string;
}
const Feature = ({ subTitle, title, description, imageURL }: FeatureProps) => {
  return (
    <section className='component-style flex flex-col  gap-[50px] rounded-[40px] bg-white p-8 dark:bg-dark-accent lg:flex-row lg:gap-[150px]'>
      <span className='flex-[0.5] items-center space-y-4 '>
        <h3>{subTitle}</h3>
        <h5 className='title'>{title}</h5>

        <p>{description}</p>
      </span>
      <span className='flex-[0.5]'>
        <Image
          className='mx-auto'
          src={imageURL}
          width={426}
          height={356}
          alt='community image'
        />
      </span>
    </section>
  );
};

export default Feature;

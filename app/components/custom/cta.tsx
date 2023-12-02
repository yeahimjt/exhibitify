import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface CtaProps {
  action: string;
  redirect: string;
}

const CtaButton = ({ action, redirect }: CtaProps) => {
  return (
    <Link
      href={redirect}
      className='flex w-fit items-center justify-center gap-[5px] rounded-[15px] bg-my-accent px-[20px] py-[9px] font-semibold text-light-bg dark:text-dark-bg'
    >
      <h5 className='text-[14px]'>{action}</h5>
      <ChevronRight size={18} />
    </Link>
  );
};

export default CtaButton;

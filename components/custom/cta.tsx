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
      className='bg-accent text-light-subtitle flex w-fit justify-center gap-[5px] rounded-[15px] px-[20px] py-[9px] font-semibold'
    >
      <h5>{action}</h5>
      <ChevronRight />
    </Link>
  );
};

export default CtaButton;

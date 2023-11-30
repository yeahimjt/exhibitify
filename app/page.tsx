import CtaButton from '@/components/custom/cta';
import NavBar from '@/components/navbar';
import Image from 'next/image';

export default function Home() {
  return (
    <main className=''>
      <NavBar />
      <header className='mt-[92px] grid grid-cols-1 2xl:grid-cols-2'>
        <section className='col-span-1 flex flex-col items-center gap-[35px] 2xl:items-start'>
          <span className=''>
            <h1>
              Establish <br /> your identity <br />
              on the internet
            </h1>
            <h2 className='w-[351px]'>
              Upload your web portfolio for valuable insights from others, or
              simple browse portfolios for inspiration.
            </h2>
          </span>
          <CtaButton action={'Start Now'} redirect={'/sign-up'} />
        </section>
        <section className='-z-10 col-span-1  2xl:absolute 2xl:right-0  2xl:w-fit'>
          <Image
            className='absolute right-0 2xl:relative'
            src='/images/header.png'
            width={903}
            height={628}
            alt='exhibitify demonstration'
          />
        </section>
      </header>
    </main>
  );
}

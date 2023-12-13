import CtaButton from '@/app/components/custom/cta';
import Feature from '@/app/components/custom/feature';
import Footer from '@/app/components/footer';
import NavBar from '@/app/components/navbar/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { handleNewsLetter } from './helper';
import Newsletter from './components/newsletter';

export default function Home() {
  return (
    <>
      <NavBar />
      <main className=''>
        <header className='home'>
          <section className=' col-span-1 flex h-fit flex-col items-center gap-[35px]  rounded-[40px] py-8'>
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
          <section className=' -top-32 -z-10 col-span-1 2xl:absolute 2xl:-right-12  2xl:top-32 2xl:w-fit'>
            <Image
              className='absolute right-0 top-[600px] pl-4 lg:pl-0 2xl:relative 2xl:top-[0px]'
              src='/images/header.png'
              width={903}
              height={628}
              alt='exhibitify demonstration'
            />
          </section>
        </header>
        <section className='relative flex flex-col gap-[20px]'>
          <Feature
            subTitle={'Community'}
            title={'Receive feedback on your portfolio'}
            imageURL={'/images/community.png'}
            description={
              'Finising a portfolio is tough, often there are obstacles we cant overcome. Seek help from others within our community to perfect the portfolio.'
            }
          />
          <Feature
            subTitle={'Exposure'}
            title={'Showcase your portfolio'}
            imageURL={'/images/showcase.png'}
            description={
              'A good portfolio is destined to be seen by other people developing their own portfolio. Make your name a recognizable brand in itself from it.'
            }
          />
        </section>
        <Newsletter />
        <Footer />
      </main>
    </>
  );
}

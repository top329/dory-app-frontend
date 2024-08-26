'use client';

import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Image from 'next/image';

import { useSelector } from '@/features/store';
import { useAuth } from '@/components';
import { UserResponse } from '@/types/auth';

import bgAuth from '@/assets/images/bg_auth.png';
import IconLogo from '@/assets/icons/logo.svg';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const { member, signup } = useSelector(state => state.auth);
  const { selectMember } = useAuth();

  const index = query.get('index');
  const type = query.get('type');

  useEffect(() => {
    if (member && type === 'login') selectMember(member as UserResponse);
    if (!signup && type === 'signup') router.replace('/signup/email');
  }, [member, signup]);

  return (
    <div className="w-full h-full !flex">
      <div className="items-center justify-center h-full bg-[#F8F8FF] hidden md:w-[40%] md:flex">
        <Image className="object-cover" alt="" src={bgAuth} priority={true} />
      </div>
      <div className="w-full md:w-[60%] pt-[42px] pb-6 px-[67px] flex items-center justify-between flex-col">
        <IconLogo />
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-[40px] font-semibold  leading-[55px] mb-4 break-normal">
            {pathname === '/login' && <>Sign in to Dory</>}
            {pathname === '/signup/email' && <>Create Your Account</>}
            {pathname === '/signup/phone' && <>Add your Phone Number</>}
            {pathname === '/signup/password' && <>Add Password</>}
            {pathname === '/verification' && index === 'email' && <>We will send an OTP code to your email</>}
            {pathname === '/verification' && index === 'phone' && <>We will send an OTP code to your Phone</>}
          </h1>
          <p className="text-xl text-[#666666] mb-10">Lorem ipsum dolor sit amet ocnsectetur</p>
          <div className="w-[550px]">{children}</div>
        </div>
        <div className="flex flex-col-reverse xl:flex-row items-center justify-between w-full">
          <p className="text-[#666666] !font-jakarta">© Dory {new Date().getFullYear()}. All rights reserved.</p>
          <div className="flex mb-2 xl:mb-0">
            <Link className="text-[#666666] !font-jakarta" href="#">
              Legal & Privacy
            </Link>
            <Link className="text-[#666666] !font-jakarta ml-16 xl:ml-10" href="#">
              Help Centre
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

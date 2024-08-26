import Image from 'next/image';
import { Button } from 'antd';

import { useSignupInitial } from '@/components/providers/SignupInitialProvider';

import personImage from '@/assets/images/person.png';

export default function InitialStart() {
  const { nextStep } = useSignupInitial();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-[-100px]">
      <div className="flex flex-col items-center justify-center mb-8 z-10">
        <Image className="object-cover mb-14" src={personImage} alt="" />
        <h1 className="text-[25px] sm:text-[40px] leading-[50px] font-semibold mb-4">Hi, Welcome to Dory</h1>
        <p className="text-[16px] sm:text-xl text-black opacity-50 leading-[28px] text-center">
          Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
        </p>
      </div>
      <Button
        className="!bg-mainColor hover:!bg-opacity-75 !h-[43px] !text-base !text-white 
        !font-semibold !leading-[24px] !w-full md:!w-[130px] !rounded-lg flex items-center 
        justify-center z-10"
        onClick={nextStep}
      >
        Get Started
      </Button>
    </div>
  );
}

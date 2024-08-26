import { useRouter } from 'next/navigation';
import { Button } from 'antd';

import { useDispatch } from '@/features/store';
import { appActions } from '@/features/app';
import { useSetSignUpMutation } from '@/features/projects/auth';
import { UserResponse } from '@/types/auth';

import { useSignupInitial } from '@/components/providers/SignupInitialProvider';

import { ApiResponse } from '@/types/global';

import IconUsers from '@/assets/icons/users_black.svg';
import IconCompass from '@/assets/icons/compass_black.svg';
import IconBack from '@/assets/icons/circle_arrow_left.svg';
import IconRight from '@/assets/icons/arrow-right.svg';

export default function SelectOption() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { signup, prevStep } = useSignupInitial();
  const [setSignUp] = useSetSignUpMutation();

  const handleClick = async (index: string) => {
    dispatch(appActions.loadingApp(true));
    const res = (await setSignUp({ ...signup, doryUseKind: index })) as { data: ApiResponse<UserResponse> };

    if (res?.data?.code === 200) router.replace('/');
    dispatch(appActions.loadingApp(false));
  };

  return (
    <>
      <div className="p-8 flex items-center gap-4">
        <div className="cursor-pointer z-10" onClick={prevStep}>
          <IconBack />
        </div>
        <p className="text-xl text-[#050505] font-medium z-10">Company Settings</p>
      </div>
      <div className="w-full h-[calc(100%-95px)] flex flex-col items-center justify-center">
        <div className="z-10 border border-[#EDEFF1] bg-white shadow rounded-xl mt-[-350px] p-8">
          <h1 className="text-[32px] font-semibold mb-8 leading-[39px] text-center">What do you use Dory for?</h1>
          <div className="flex flex-col">
            <Button type="default" className="!w-[675px] !px-4 !py-5 !h-auto !rounded-lg mb-4 group" onClick={() => handleClick('1')}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-[#EDEFF1] rounded-full flex items-center justify-center">
                  <IconCompass />
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="text-start">
                    <p className="text-xl font-semibold mb-2 text-black">Just want to try Dory with dummy data</p>
                    <p className="text-black">Lorem ipsum is placeholder text commonly </p>
                  </div>
                  <div className="invisible group-hover:visible">
                    <IconRight />
                  </div>
                </div>
              </div>
            </Button>
            <Button type="default" className="!w-[675px] !px-4 !py-5 !h-auto !rounded-lg group" onClick={() => handleClick('2')}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-[#EDEFF1] rounded-full flex items-center justify-center">
                  <IconUsers />
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="text-start">
                    <p className="text-xl font-semibold mb-2 text-black">To recruit employees</p>
                    <p className="text-black">Lorem ipsum is placeholder text commonly </p>
                  </div>
                  <div className="invisible group-hover:visible">
                    <IconRight />
                  </div>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

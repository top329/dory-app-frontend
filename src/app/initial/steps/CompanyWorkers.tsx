'use client';

import { useState } from 'react';
import { Button } from 'antd';

import { useSignupInitial } from '@/components/providers/SignupInitialProvider';

import IconBack from '@/assets/icons/circle_arrow_left.svg';
import IconCheck from '@/assets/icons/check.svg';

export default function CompanyWorkers() {
  const { signup, prevStep, nextStep, onSubmit } = useSignupInitial();

  const [error, setError] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(signup?.employeesValue as string);

  const handleSelect = (value: string) => {
    setSelected(value);
    setError(false);
  };

  const handleSubmit = () => {
    if (!selected || selected === '') {
      setError(true);
      return;
    }

    void onSubmit({ employeesKey: selected.split(' ')[0], employeesValue: selected });
    nextStep();
  };

  return (
    <>
      <div className="p-8 flex items-center gap-4">
        <div className="cursor-pointer z-10" onClick={prevStep}>
          <IconBack />
        </div>
        <p className="text-xl text-[#050505] font-medium z-10">Company Settings</p>
      </div>
      <div className="w-full h-[calc(100%-92px)] flex flex-col items-center justify-center">
        <div
          className="flex flex-col items-center justify-center z-10 p-8 
          border border-[#EDEFF1] bg-white shadow rounded-xl mt-[-350px]"
        >
          <h1 className="text-[32px] text-black font-semibold mb-4 leading-[39px] text-center">
            How many workers in <br /> your company?
          </h1>
          <h3 className="text-base leading-[22px] text-black opacity-50 mb-8 text-center">Lorem ipsum is placeholder text commonly used</h3>
          <div className="w-full">
            <div
              className={`w-[500px] h-12 rounded-lg border border-[#EDEFF1] mb-2 
              flex items-center justify-between hover:border-mainColor cursor-pointer 
              pl-2 p-4 ${selected === '1-10 Workers' && '!border-mainColor'}`}
              onClick={() => handleSelect('1-10 Workers')}
            >
              <p className="text-[#101828] text-base font-medium">1-10 Workers</p>
              {selected === '1-10 Workers' && <IconCheck />}
            </div>
            <div
              className={`w-[500px] h-12 rounded-lg border border-[#EDEFF1] mb-2 
              flex items-center justify-between hover:border-mainColor cursor-pointer 
              pl-2 p-4 ${selected === '11-50 Workers' && '!border-mainColor'}`}
              onClick={() => handleSelect('11-50 Workers')}
            >
              <p className="text-[#101828] text-base font-medium">11-50 Workers</p>
              {selected === '11-50 Workers' && <IconCheck />}
            </div>
            <div
              className={`w-[500px] h-12 rounded-lg border border-[#EDEFF1] mb-2 
              flex items-center justify-between hover:border-mainColor cursor-pointer 
              pl-2 p-4 ${selected === '51-200 Workers' && '!border-mainColor'}`}
              onClick={() => handleSelect('51-200 Workers')}
            >
              <p className="text-[#101828] text-base font-medium">51-200 Workers</p>
              {selected === '51-200 Workers' && <IconCheck />}
            </div>
            <div
              className={`w-[500px] h-12 rounded-lg border border-[#EDEFF1] 
              flex items-center justify-between hover:border-mainColor cursor-pointer 
              pl-2 p-4 ${selected === '200 and more workers' && '!border-mainColor'}`}
              onClick={() => handleSelect('200 and more workers')}
            >
              <p className="text-[#101828] text-base font-medium">200 and more workers</p>
              {selected === '200 and more workers' && <IconCheck />}
            </div>
          </div>

          {error ? <p className="text-sm text-[#f04438] !text-start h-5 w-full">This is a required option.</p> : <p className="h-5">&nbsp;</p>}

          <Button
            className="!bg-mainColor hover:!bg-opacity-75 !h-[43px] !text-base !text-white !font-semibold !leading-[24px] !w-full !mt-2"
            type="primary"
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}

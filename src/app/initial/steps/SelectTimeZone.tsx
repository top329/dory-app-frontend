'use client';

import { useState } from 'react';
import { Button, Form } from 'antd';

import { Select } from '@/components';
import { useSignupInitial } from '@/components/providers/SignupInitialProvider';
import { useTimezoneSelect, allTimezones, ITimezoneOption } from 'react-timezone-select';
import type { SignupProps } from '@/types/auth';

import IconClock from '@/assets/icons/clock.svg';
import IconBack from '@/assets/icons/circle_arrow_left.svg';

export default function SelectTimeZone() {
  const { signup, form, prevStep, nextStep, onSubmit } = useSignupInitial();
  const { options } = useTimezoneSelect({ labelStyle: 'original', timezones: allTimezones });

  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (data: SignupProps) => {
    if (!data.timezoneValue || data.timezoneValue === '') {
      setError(true);
      form.setFields([{ name: 'timezoneValue', errors: ['This is a required field.'] }]);
      return;
    }

    const find = options.find((f: ITimezoneOption) => f.label === data.timezoneValue);
    void onSubmit({ timezoneKey: find?.offset?.toString(), timezoneValue: find?.label });
    nextStep();
  };

  return (
    <>
      <div className="p-8 flex items-center gap-4">
        <div className="cursor-pointer z-10" onClick={prevStep}>
          <IconBack />
        </div>
        <p className="text-xl text-[#050505] font-medium z-10">Select timezone</p>
      </div>
      <div className="w-full h-[calc(100%-92px)] flex flex-col items-center justify-center">
        <div
          className="flex flex-col items-center justify-center z-10 p-8 
        border border-[#EDEFF1] bg-white shadow rounded-xl mt-[-350px]"
        >
          <h1 className="text-[32px] text-black font-semibold mb-4">Select Your Timezone</h1>
          <h3 className="text-base leading-[22px] text-black opacity-50 mb-8 text-center">
            Lorem ipsum is placeholder text commonly used <br /> in the graphic, print, and publishing
          </h3>
          <Form className="mb-5" form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ timezoneValue: signup?.timezoneValue }}>
            <Form.Item name="timezoneValue">
              <Select
                form={form}
                options={options}
                className="w-[500px] h-11 cursor-pointer"
                placeholder="Select timezone"
                startIcon={<IconClock />}
                searchable={false}
                error={error}
                setError={setError}
                errorMessage="This is a required field."
              />
            </Form.Item>
            <Button
              className="!bg-mainColor hover:!bg-opacity-75 !h-[43px] !text-base !text-white !font-semibold !leading-[24px] !w-full !mt-2"
              type="primary"
              htmlType="submit"
            >
              Continue
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

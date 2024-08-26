'use client';

import { useEffect, useState } from 'react';
import { Button, Form } from 'antd';

import { useSignupInitial } from '@/components/providers/SignupInitialProvider';
import { Select } from '@/components';

import { useGetDefaultLanguageQuery } from '@/features/projects/auth';

import type { SignupProps } from '@/types/auth';
import type { ApiResponse, LanguageType, Option } from '@/types/global';

export default function DefaultLanguage() {
  const { data } = useGetDefaultLanguageQuery({ kind: 2, sword: '' });
  const { signup, form, onSubmit, nextStep } = useSignupInitial();

  const [language, setLanguage] = useState<Option[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const langData = data as ApiResponse<LanguageType[]>;

      setLanguage(
        langData?.data?.map((rs: LanguageType) => {
          return {
            label: rs.languageName,
            value: rs.languageCode,
          };
        })
      );
    })();
  }, [data]);

  const handleSubmit = async (data: SignupProps) => {
    if (!data.languageName || data.languageName === '') {
      setError(true);
      form.setFields([{ name: 'languageName', errors: ['This is a required field.'] }]);
      return;
    }

    const find = language.find((f: Option) => f.label === data.languageName);
    void onSubmit({ languageCode: find?.value, languageName: data.languageName });
    nextStep();
  };

  return (
    <>
      <div className="p-8 flex items-center">
        <p className="text-xl text-[#050505] font-medium z-10">Select default language</p>
      </div>
      <div className="w-full h-[calc(100%-92px)] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center z-10 p-8 border border-[#EDEFF1] bg-white shadow rounded-xl mt-[-350px]">
          <h1 className="text-[32px] text-black font-semibold mb-4">Select Default Language</h1>
          <h3 className="text-base leading-[22px] text-black opacity-50 mb-8 text-center">
            Lorem ipsum is placeholder text commonly used <br /> in the graphic, print, and publishing
          </h3>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ languageName: signup?.languageName }}
          >
            <Form.Item name="languageName" label="Select language">
              <Select
                form={form}
                options={language}
                className="w-[500px] h-11 cursor-pointer"
                placeholder="Select language"
                searchable={true}
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

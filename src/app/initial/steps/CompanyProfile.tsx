'use client';

import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { Button, ColorPicker, Form, Input } from 'antd';
import { Color } from 'antd/es/color-picker';

import { useSignupInitial } from '@/components/providers/SignupInitialProvider';
import { SignupProps } from '@/types/auth';

import IconPlaceholder from '@/assets/icons/placeholder.svg';
import IconImage from '@/assets/images/logo.png';
import IconBack from '@/assets/icons/circle_arrow_left.svg';

export default function CompanyProfile() {
  const { form, prevStep, nextStep, onSubmit } = useSignupInitial();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | undefined>(undefined);
  const [url, setUrl] = useState<string>('');

  const handleFileBrowser = () => {
    fileRef?.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (
        e.target.files[0]?.type !== 'image/gif' &&
        e.target.files[0]?.type !== 'image/jpeg' &&
        e.target.files[0]?.type !== 'image/png' &&
        e.target.files[0]?.type !== 'image/jpg' &&
        e.target.files[0]?.type !== 'image/svg+xml'
      ) {
        return;
      }

      setFile(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));

      form.setFields([{ name: 'companyLogoFile', errors: undefined, value: e.target.files[0] }]);
    }
  };

  const handleDeleteFile = () => {
    form.setFields([{ name: 'companyLogoFile', errors: ['This is a required field.'], value: undefined }]);
    setFile(undefined);
    setUrl('');
    fileRef!.current!.value = '';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files) {
      if (
        e.dataTransfer.files[0]?.type !== 'image/gif' &&
        e.dataTransfer.files[0]?.type !== 'image/jpeg' &&
        e.dataTransfer.files[0]?.type !== 'image/png' &&
        e.dataTransfer.files[0]?.type !== 'image/jpg' &&
        e.dataTransfer.files[0]?.type !== 'image/svg+xml'
      ) {
        return;
      }

      setFile(e.dataTransfer.files[0]);
      setUrl(URL.createObjectURL(e.dataTransfer.files[0]));

      form.setFields([{ name: 'companyLogoFile', errors: undefined, value: e.dataTransfer.files[0] }]);
    }
  };

  const handleColorPicker = (name: string, value: Color) => {
    form.setFieldValue(name, `#${value.toHex()}`);
  };

  const handleSubmit = async (data: SignupProps) => {
    void onSubmit({ ...data, companyLogoFile: file });
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
      <div className="w-full h-[calc(100%-95px)] flex flex-col items-center justify-center">
        <div
          className="flex flex-col items-center justify-center z-10 p-8 
        border border-[#EDEFF1] bg-white shadow rounded-xl mt-[-350px]"
        >
          <h1 className="text-[32px] font-semibold mb-8 leading-[39px] text-center">Company Settings</h1>
          <div className="w-full flex items-center justify-start mb-4">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{ companyLogoFile: null, primaryColor: '#000000', secondaryColor: '#000000' }}
            >
              <p className="text-xl font-medium mb-4">Upload company logo</p>
              <Form.Item name="companyLogoFile" rules={[{ message: 'This is a required field.', required: true }]}>
                <div className="flex items-center gap-4" onDragOver={handleDragOver} onDrop={handleDrop}>
                  <input ref={fileRef} type="file" className="!hidden" onChange={handleFileChange} accept=".png, .jpeg, .jpg, .gif, .svg" />

                  {!file && (
                    <>
                      <div
                        className="w-[72px] h-[72px] rounded-full border border-[#B3B3B3] border-dashed cursor-pointer flex items-center justify-center bg-[#F8F8F8]"
                        onClick={handleFileBrowser}
                      >
                        <IconPlaceholder />
                      </div>
                      <div>
                        <p className="text-base font-medium mb-2">Upload Company Profile</p>
                        <p className="text-xs text-[#4D6670]">Photos help your teammates recognize you in Dory</p>
                      </div>
                    </>
                  )}

                  {file && (
                    <>
                      <div className="w-[72px] h-[72px] rounded-full border border-[#B3B3B3] bg-white relative">
                        {url === '' ? (
                          <Image src={IconImage} alt="" width={72} height={72} className="rounded-full" />
                        ) : (
                          <Image src={url} alt="" width={72} height={72} className="!w-full !h-full !rounded-full !object-cover" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Button type="default" className="!h-8 !w-[129px] !rounded-lg" onClick={handleFileBrowser}>
                            <p className="!text-sm !text-[#344054] !font-semibold">Change photo</p>
                          </Button>
                          <Button type="default" danger className="!h-8 !w-[102px] !rounded-lg" onClick={handleDeleteFile}>
                            <p className="!text-sm !text-[#C83A3A] !font-semibold">Delete photo</p>
                          </Button>
                        </div>
                        <p className="text-xs text-[#4D6670]">Photos help your teammates recognize you in Dory</p>
                      </div>
                    </>
                  )}
                </div>
              </Form.Item>
              <p className="text-xl font-medium mb-4">Company details</p>
              <Form.Item name="companyName" label="Company name" rules={[{ message: 'This is a required field.', required: true }]}>
                <Input placeholder="Please enter your company name" />
              </Form.Item>
              <div className="flex items-center gap-4 mb-4">
                <Form.Item name="primaryColor" label="Primary color">
                  <ColorPicker
                    className="!h-9 !w-28 !rounded-lg"
                    showText
                    onChangeComplete={(value: Color) => handleColorPicker('primaryColor', value)}
                  />
                </Form.Item>
                <Form.Item name="secondaryColor" label="Secondary color">
                  <ColorPicker
                    showText
                    className="!h-9 !w-28 !rounded-lg"
                    onChangeComplete={(value: Color) => handleColorPicker('secondaryColor', value)}
                  />
                </Form.Item>
              </div>
              <div className="w-full flex items-center gap-3">
                <Button type="default" className="!h-12 !w-[377px] !rounded-lg" onClick={nextStep}>
                  <span className="text-base text-[#344054] font-semibold">Do it later</span>
                </Button>
                <Button type="primary" htmlType="submit" className="!h-12 !w-[377px] !bg-mainColor hover:!opacity-75 !rounded-lg">
                  <span className="text-base text-white font-semibold">Continue & Finish</span>
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

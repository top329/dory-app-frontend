'use client';

import { ChangeEvent, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Select } from '@/components';

import { FormProps, Option, PHONE_CODE } from '@/types/global';

export default function SignupForm({ loading, onSubmit }: FormProps) {
  const [form] = Form.useForm();

  const [countryCode, setCountryCode] = useState<string>('+1');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    form.setFieldValue('phone', value.substring(0, 13));
  };

  const handlePhoneCode = (item: Option) => {
    form.setFieldValue('code', item?.label);
    setCountryCode(item?.code as string);
  };

  return (
    <Form className="!mb-8 !relative" form={form} layout="vertical" onFinish={onSubmit} initialValues={{ phone: '', code: 'US' }}>
      <div className="absolute top-1/4 z-50 left-[90px] mt-[1px]">
        <span className="text-base text-[#101828] font-semibold">{countryCode}</span>
      </div>
      <Form.Item name="phone" rules={[{ message: 'This is a required field.', required: true }]} label="Phone number">
        <Input className="!pl-[130px]" placeholder="Enter your phone number" onChange={handleChangeInput} />
      </Form.Item>
      <div className="absolute top-[30px]">
        <Form.Item name="code">
          <Select
            className="w-[80px] h-[40px] !border-t-0 !border-l-0 !border-b-0 !rounded-r-none cursor-pointer"
            form={form}
            options={PHONE_CODE}
            kind="phone"
            searchable={true}
            onChangeValue={handlePhoneCode}
          />
        </Form.Item>
      </div>
      <Button
        className="!bg-mainColor !h-[39px] !text-base !text-white !font-semibold !leading-[24px] !w-full !mt-4"
        type="primary"
        htmlType="submit"
        loading={loading}
      >
        Continue
      </Button>
    </Form>
  );
}

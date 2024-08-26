'use client';

import Link from 'next/link';
import { Button, Form, Input } from 'antd';
import { RuleObject } from 'antd/es/form';

import { FormProps } from '@/types/global';

import IconGoogle from '@/assets/icons/google.svg';

export default function SignupForm({ loading, onSubmit }: FormProps) {
  const [form] = Form.useForm();

  const validateEmail = (_: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject('This is a required field.');
    }

    if (!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value)) {
      return Promise.reject('Invalid email address.');
    }

    /* if (['gmail', 'hotmail', 'yahoo', 'outlook'].includes(value.split('@')[1].split('.')[0])) {
      return Promise.reject('Email must use work email.');
    } */

    return Promise.resolve();
  };

  return (
    <>
      <Button
        type="default"
        className="!w-full !h-[44px] !text-base !text-[#344054] !font-semibold 
        !flex !items-center !justify-center hover:!opacity-75 !mb-8"
        icon={<IconGoogle />}
      >
        Sign up with Google
      </Button>
      <div className="relative w-full border border-[#EAECF0] flex items-center justify-center mb-8">
        <div className="absolute text-sm text-[#475467] bg-white px-2 font-medium">Or</div>
      </div>
      <Form className="!mb-8" form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="email"
          rules={[
            {
              validator: validateEmail,
            },
          ]}
          label="Email"
        >
          <Input placeholder="michael@example.com" />
        </Form.Item>
        <Button
          className="!bg-mainColor hover:!bg-opacity-75 !h-[39px] !text-base !text-white !font-semibold !leading-[24px] !w-full !mt-4"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Continue
        </Button>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-xl font-semibold">Already have an account?</p>
        &nbsp;&nbsp;
        <Link className="!text-xl !font-semibold !text-mainColor" href="/login">
          Login
        </Link>
      </div>
    </>
  );
}

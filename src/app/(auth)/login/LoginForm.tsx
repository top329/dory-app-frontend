import Link from 'next/link';
import { Form, Input, Button } from 'antd';

import { FormProps } from '@/types/global';

export default function LoginForm({ onSubmit, loading }: FormProps) {
  const [form] = Form.useForm();

  return (
    <div className="w-full">
      <Form className="!mb-8" form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="username" rules={[{ message: 'This is a required field.', required: true }]} label="Email Or Phone Number">
          <Input placeholder="Please enter your email or phone number" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ message: 'This is a required field.', required: true }]}>
          <Input.Password placeholder="Fill Your Password" />
        </Form.Item>
        <Link className="font-semibold text-mainColor text-base flex justify-end mb-8 hover:!opacity-75" href="#">
          Forget Password
        </Link>
        <Button
          className="!h-[39px] !w-full !rounded-lg !bg-mainColor hover:!opacity-75 !flex !items-center !justify-center"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          <p className="text-base font-semibold">Sign in</p>
        </Button>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-lg font-semibold">Don’t have an account?</p>
        &nbsp;&nbsp;
        <Link className="text-lg font-semibold text-mainColor" href="/signup/email">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

'use client';

import { Button, Col, Form, Input, Row } from 'antd';
import { RuleObject } from 'antd/es/form';

import { FormProps } from '@/types/global';

export default function SignupForm({ onSubmit }: FormProps) {
  const [form] = Form.useForm();

  return (
    <>
      <Form className="!mb-8" form={form} layout="vertical" onFinish={onSubmit}>
        <Row>
          <Col span={11}>
            <Form.Item name="firstName" label="First Name" rules={[{ message: 'This is a required field.', required: true }]}>
              <Input placeholder="Fill Your first name" />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <Form.Item name="lastName" label="Last Name" rules={[{ message: 'This is a required field.', required: true }]}>
              <Input placeholder="Fill Your last name" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="password" label="Password" rules={[{ message: 'Please enter your password', required: true }]}>
          <Input.Password placeholder="Fill Your Password" />
        </Form.Item>
        <Form.Item
          className="mb-8"
          name="password2"
          label="Confirm Password"
          rules={[
            { message: 'Please confirm your password', required: true },
            ({ getFieldValue }) => ({
              validator(_: RuleObject, value: string) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Passwords do not match. Please try again.'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Fill Your Password" />
        </Form.Item>
        <Button
          className="!bg-mainColor hover:!opacity-75 !h-[39px] !text-base !text-white !font-semibold !leading-[24px] !w-full !mt-4"
          type="primary"
          htmlType="submit"
        >
          Sign up now
        </Button>
      </Form>
    </>
  );
}

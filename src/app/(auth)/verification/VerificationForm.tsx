'use client';

import { KeyboardEvent, useRef, useState, useEffect } from 'react';
import { Form, Input, Button, InputRef, Alert } from 'antd';

import { useInterval } from '@/utils';
import { FormProps } from '@/types/global';

import { ClockCircleFilled } from '@ant-design/icons';

export default function VerificationForm({ onSubmit, loading, error, onResent }: FormProps) {
  const [form] = Form.useForm();

  const inputRef = useRef<InputRef[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [intervalDelay, setIntervalDelay] = useState<number>(1000);
  const [decrement, setDecrement] = useState<number>(30);
  const [disable, setDisable] = useState<boolean>(true);

  useEffect(() => {
    form.setFieldsValue({
      code_1: '',
      code_2: '',
      code_3: '',
      code_4: '',
      code_5: '',
      code_6: '',
    });
  }, []);

  useInterval(() => {
    handleCountDown();
  }, intervalDelay);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (
      e.key !== '0' &&
      e.key !== '1' &&
      e.key !== '2' &&
      e.key !== '3' &&
      e.key !== '4' &&
      e.key !== '5' &&
      e.key !== '6' &&
      e.key !== '7' &&
      e.key !== '8' &&
      e.key !== '9'
    ) {
      form.setFieldValue(`code_${index + 1}`, '');
    }

    if (
      e.key === '0' ||
      e.key === '1' ||
      e.key === '2' ||
      e.key === '3' ||
      e.key === '4' ||
      e.key === '5' ||
      e.key === '6' ||
      e.key === '7' ||
      e.key === '8' ||
      e.key === '9'
    ) {
      form.setFieldValue(`code_${index + 1}`, e.key);
      inputRef?.current?.[index]?.blur();
      inputRef?.current?.[index + 1]?.focus();
    }

    if (e.key === 'Backspace') {
      inputRef?.current?.[index - 1]?.focus();
    }

    if (
      form.getFieldValue('code_1') !== '' &&
      form.getFieldValue('code_2') !== '' &&
      form.getFieldValue('code_3') !== '' &&
      form.getFieldValue('code_4') !== '' &&
      form.getFieldValue('code_5') !== '' &&
      form.getFieldValue('code_6') !== ''
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const handleCountDown = () => {
    if (decrement <= 0) {
      setDecrement(30);
      setIntervalDelay(-1);
      setShow(true);
      setDisable(true);
      form.resetFields();
    } else {
      setDecrement(preDec => preDec - 1);
    }
  };

  const handleResend = () => {
    setIntervalDelay(1000);
    setShow(false);

    if (onResent) onResent();
  };

  return (
    <>
      {error !== 200 && (
        <Alert message="Wrong OTP Entered" type="error" closable={false} className="!mb-10 !text-[#A1231B] !text-base !font-semibold !text-center" />
      )}

      <Form className="!mb-8" form={form} layout="vertical" onFinish={onSubmit}>
        <div className="flex items-center gap-2 justify-center mb-8">
          <Form.Item name="code_1" className="!mb-0">
            <Input
              className="!w-[64px] !h-[64px] !text-center !border-[2px] !text-mainColor !text-4xl lg:!w-[64px] lg:!h-[64px]"
              placeholder="-"
              maxLength={1}
              ref={(el: InputRef) => (inputRef.current[0] = el)}
              onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => handleKeyUp(e, 0)}
            />
          </Form.Item>
          <Form.Item name="code_2" className="!mb-0">
            <Input
              className="!w-[64px] !h-[64px] !text-center !border-[2px] !text-mainColor !text-4xl lg:!w-[64px] lg:!h-[64px]"
              placeholder="-"
              ref={(el: InputRef) => (inputRef.current[1] = el)}
              maxLength={1}
              onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => handleKeyUp(e, 1)}
            />
          </Form.Item>
          <Form.Item name="code_3" className="!mb-0">
            <Input
              className="!w-[64px] !h-[64px] !text-center !border-[2px] !text-mainColor !text-4xl lg:!w-[64px] lg:!h-[64px]"
              placeholder="-"
              ref={(el: InputRef) => (inputRef.current[2] = el)}
              maxLength={1}
              onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => handleKeyUp(e, 2)}
            />
          </Form.Item>
          <div className="w-7 h-[64px] flex items-center justify-center">
            <div className="w-6 h-2 bg-[#D0D5DD]"></div>
          </div>
          <Form.Item name="code_4" className="!mb-0">
            <Input
              className="!w-[64px] !h-[64px] !text-center !border-[2px] !text-mainColor !text-4xl lg:!w-[64px] lg:!h-[64px]"
              placeholder="-"
              ref={(el: InputRef) => (inputRef.current[3] = el)}
              maxLength={1}
              onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => handleKeyUp(e, 3)}
            />
          </Form.Item>
          <Form.Item name="code_5" className="!mb-0">
            <Input
              className="!w-[64px] !h-[64px] !text-center !border-[2px] !text-mainColor !text-4xl lg:!w-[64px] lg:!h-[64px]"
              placeholder="-"
              ref={(el: InputRef) => (inputRef.current[4] = el)}
              maxLength={1}
              onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => handleKeyUp(e, 4)}
            />
          </Form.Item>
          <Form.Item name="code_6" className="!mb-0">
            <Input
              className="!w-[64px] !h-[64px] !text-center !border-[2px] !text-mainColor !text-4xl lg:!w-[64px] lg:!h-[64px]"
              placeholder="-"
              ref={(el: InputRef) => (inputRef.current[5] = el)}
              maxLength={1}
              onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => handleKeyUp(e, 5)}
            />
          </Form.Item>
        </div>
        <Button
          className={`!h-[39px] !w-full !rounded-lg ${!disable ? '!bg-mainColor' : ''} hover:!opacity-75 !text-base !font-semibold`}
          type="primary"
          htmlType="submit"
          disabled={disable}
          loading={loading}
        >
          Verification
        </Button>
      </Form>

      {show && (
        <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
          <p className="text-xl font-semibold">Not receiving 6 digit otp code?</p>
          <Button type="link" className="!text-xl !font-semibold !text-mainColor !p-0 hover:!opacity-75" onClick={handleResend}>
            Resend OTP code
          </Button>
        </div>
      )}

      {!show && (
        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
          <p className="text-xl font-semibold">Resend OTP code within</p>
          <div>
            <ClockCircleFilled className="!text-mainColor" />
            <span className="text-xl font-semibold text-mainColor ml-2">00.{decrement.toString().padStart(2, '0')}</span>
          </div>
        </div>
      )}
    </>
  );
}

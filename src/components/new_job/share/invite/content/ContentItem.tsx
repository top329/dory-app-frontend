'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Input, Row } from 'antd';

import { Select } from '@/components';

import type { InviteCandidatesProps } from '@/app/new_job/create/ShareJob';
import { Option, PHONE_CODE } from '@/types/global';

import { CloseOutlined } from '@ant-design/icons';

export default function ContentItem({ form, field, remove, totalCnt, index }: InviteCandidatesProps) {
  const [countryCode, setCountryCode] = useState<string>('+1');

  useEffect(() => {
    if (index) {
      form?.setFields([{ name: ['individualContent', index, 'code'], errors: undefined, value: 'US' }]);
    }
  }, [field, index]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const id = e.target.id.split('_')[2];

    if (e.target.value !== '') {
      if (id === 'phone') {
        value = e.target.value.replace(/[^0-9]/g, '').substring(0, 13);
      } else if (id === 'email') {
        value = e.target.value;

        if (!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value)) {
          form?.setFields([{ name: ['individualContent', index, `${id}`], errors: ['Invalid email address.'], value }]);
          return;
        }
      }

      form?.setFields([{ name: ['individualContent', index, `${id}`], errors: undefined, value }]);
    } else {
      form?.setFields([{ name: ['individualContent', index, `${id}`], errors: ['This is a required field.'], value: '' }]);
    }
  };

  const handlePhoneCode = (item: Option) => {
    form?.setFields([{ name: ['individualContent', index, 'code'], errors: undefined, value: item?.label }]);
    setCountryCode(item?.code as string);
  };

  return (
    <Card className="!mb-4 last:!mb-0">
      <div className="flex items-center justify-end h-6">
        {totalCnt && totalCnt > 1 && (
          <Button
            className="!p-0 !w-auto !h-auto"
            type="link"
            icon={<CloseOutlined className="!text-[#294753] hover:!opacity-75" />}
            onClick={() => {
              if (remove && field) remove(field.name);
            }}
          />
        )}
      </div>
      <Form.Item
        name={field && [field?.name, 'name']}
        label={
          <>
            Full name<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
          </>
        }
      >
        <Input placeholder="Full name" className="!h-10" onChange={handleChangeInput} />
      </Form.Item>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            className="!mb-0"
            name={field && [field?.name, 'email']}
            label={
              <>
                Email<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
              </>
            }
          >
            <Input placeholder="Email" className="!h-10" onChange={handleChangeInput} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <div className="absolute top-[38px] z-50 left-[100px] mt-[1px]">
            <span className="text-base text-[#101828] font-semibold">{countryCode}</span>
          </div>
          <Form.Item name={field && [field?.name, 'phone']} label="Phone number" className="!mb-0">
            <Input className="!pl-[130px] !h-10" placeholder="Phone number" onChange={handleChangeInput} />
          </Form.Item>
          <div className="absolute top-[30px]">
            <Form.Item name={field && [field?.name, 'code']} className="!mb-0">
              <Select
                className="w-[80px] h-10 !border-t-0 !border-l-0 !border-b-0 !rounded-r-none cursor-pointer"
                form={form}
                options={PHONE_CODE}
                kind="phone"
                searchable={true}
                onChangeValue={handlePhoneCode}
              />
            </Form.Item>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

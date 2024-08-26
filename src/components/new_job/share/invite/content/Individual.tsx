'use client';

import { Button, Form, FormListFieldData } from 'antd';

import ContentItem from './ContentItem';

import type { InviteCandidatesProps } from '@/app/new_job/create/ShareJob';

import { PlusOutlined } from '@ant-design/icons';

export default function Individual({ form }: InviteCandidatesProps) {
  return (
    <>
      <Form.List name="individualContent">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field: FormListFieldData) => (
              <ContentItem key={field.key} form={form} field={field} remove={remove} totalCnt={fields.length} index={field.key} />
            ))}

            <Button type="link" className="!px-0" onClick={add}>
              <div className="flex items-center gap-2 hover:!opacity-75">
                <PlusOutlined className="!text-[#475467]" />
                <p className="text-sm text-[#475467] font-semibold">Add Candidates</p>
              </div>
            </Button>
          </>
        )}
      </Form.List>
    </>
  );
}

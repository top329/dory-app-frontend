'use client';

import { ChangeEvent, useEffect } from 'react';
import { Button, Card, Col, Form, Input, Row } from 'antd';

import { Select } from '@/components';

import type { InviteCandidatesProps } from '@/app/new_job/create/ShareJob';
import { Editor } from '@tinymce/tinymce-react';
import { Option, SCHEDULE, SCHEDULE_TIME } from '@/types/global';

import { CloseOutlined } from '@ant-design/icons';

export default function ContentItem({ form, field, remove, totalCnt, index, fieldName }: InviteCandidatesProps) {
  useEffect(() => {
    form?.setFields([{ name: [fieldName, Number(totalCnt) - 1, 'schedule'], errors: undefined, value: 'After Initial Invitation' }]);
    form?.setFields([{ name: [fieldName, Number(totalCnt) - 1, 'scheduleTime'], errors: undefined, value: '1' }]);
  }, [index]);

  const handleChangeSubject = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      form?.setFields([{ name: [fieldName, index, 'reminderSubject'], errors: undefined, value: e.target.value }]);
    } else {
      form?.setFields([{ name: [fieldName, index, 'reminderSubject'], errors: ['This is a required field.'], value: e.target.value }]);
    }
  };

  const handleChangeEditor = (content: string) => {
    if (content !== '') {
      form?.setFields([{ name: [fieldName, index, 'reminderBody'], errors: undefined, value: content }]);
    } else {
      form?.setFields([{ name: [fieldName, index, 'reminderBody'], errors: ['This is a required field.'], value: '' }]);
    }
  };

  const handleChangeSchedule = (item: Option) => {
    form?.setFields([{ name: [fieldName, index, 'schedule'], errors: undefined, value: item.label }]);
  };

  const handleChangeScheduleTime = (item: Option) => {
    form?.setFields([{ name: [fieldName, index, 'scheduleTime'], errors: undefined, value: item.label }]);
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
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name={field && [field?.name, 'schedule']}
            label={
              <>
                Schedule For<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
              </>
            }
          >
            <Select
              form={form}
              options={SCHEDULE}
              className="w-full h-10 cursor-pointer"
              placeholder="Select schedule"
              onChangeValue={handleChangeSchedule}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={field && [field?.name, 'scheduleTime']}
            label={
              <>
                Time<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
              </>
            }
          >
            <Select
              form={form}
              options={SCHEDULE_TIME}
              className="w-full h-10 cursor-pointer"
              placeholder="Select time"
              onChangeValue={handleChangeScheduleTime}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name={field && [field?.name, 'reminderSubject']}
        label={
          <>
            Email Subject line<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
          </>
        }
      >
        <Input placeholder="Subject" className="!h-10" onChange={handleChangeSubject} />
      </Form.Item>
      <Form.Item
        name={field && [field?.name, 'reminderBody']}
        label={
          <>
            Template Body<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
          </>
        }
        getValueFromEvent={(_, editor) => editor.getContent()}
      >
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
          init={{ menubar: false, branding: false, height: 250, placeholder: 'Template text...' }}
          onEditorChange={content => handleChangeEditor(content)}
        />
      </Form.Item>
    </Card>
  );
}

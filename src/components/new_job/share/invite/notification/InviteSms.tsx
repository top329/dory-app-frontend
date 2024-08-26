'use client';

import { useEffect, useState } from 'react';
import { Divider, Form } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

import type { InviteCandidatesProps } from '@/app/new_job/create/ShareJob';

export default function InviteSms({ form }: InviteCandidatesProps) {
  const handleChangeEditor = (content: string, value: string) => {
    if (content !== '') {
      form?.setFields([{ name: value, errors: undefined, value: content }]);
    } else {
      form?.setFields([{ name: value, errors: ['This is a required field.'], value: '' }]);
    }
  };

  return (
    <>
      <Divider />
      <Form.Item
        name="bodySms"
        label={
          <>
            SMS To Candidate<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
          </>
        }
        getValueFromEvent={(_, editor) => editor.getContent()}
      >
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
          init={{ menubar: false, branding: false, height: 250, placeholder: 'Sms text...' }}
          onEditorChange={content => handleChangeEditor(content, 'bodySms')}
        />
      </Form.Item>
    </>
  );
}

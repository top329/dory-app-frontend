'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Card, Form, FormInstance, Input } from 'antd';
import { useWorkflow } from '@/components';

export default function AutoConfirmationEmail({ form }: { form: FormInstance<any> }) {
  const { stageContent, addStageContent } = useWorkflow();

  const [body, setBody] = useState<string>(
    '<p>Your application for the [job_offer] position has been successfully submitted.<br /><br />If you want to add something to your application just respond to this email.</p>'
  );
  const [subject, setSubject] = useState<string>('Confirmation of your application');

  useEffect(() => {
    form.setFieldValue('subject', subject);
    form.setFieldValue('body', body);
  }, [form, stageContent, addStageContent]);

  const handleChangeSubject = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      form.setFields([{ name: e.target.id, errors: undefined, value: e.target.value }]);
      setSubject(e.target.value);
    } else {
      form.setFields([{ name: e.target.id, errors: ['This is a required field.'], value: e.target.value }]);
    }
  };

  const handleChangeEditor = (content: string, value: string) => {
    if (content !== '') {
      form.setFields([{ name: value, errors: undefined, value: content }]);
      setBody(content);
    } else {
      form.setFields([{ name: value, errors: ['This is a required field.'], value: '' }]);
    }
  };

  return (
    <>
      <Card
        title={
          <>
            <Form.Item name="subject" className="!my-4">
              <Input className="!h-10" placeholder="Email subject" onChange={handleChangeSubject} />
            </Form.Item>
          </>
        }
      >
        <Form.Item className="!mb-0" name="body" getValueFromEvent={(_, editor) => editor.getContent()}>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
            init={{ menubar: false, branding: false, height: 250, placeholder: 'Email text...' }}
            onEditorChange={content => handleChangeEditor(content, 'body')}
          />
        </Form.Item>
      </Card>
    </>
  );
}

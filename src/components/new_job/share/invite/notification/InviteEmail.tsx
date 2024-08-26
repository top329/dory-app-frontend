'use client';

import { ChangeEvent, useEffect, useState, useRef } from 'react';

import { Button, Card, Divider, Form, Input, UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { Editor } from '@tinymce/tinymce-react';
import SignaturePad from 'react-signature-canvas';

import type { InviteCandidatesProps } from '@/app/new_job/create/ShareJob';

import { CloseOutlined } from '@ant-design/icons';
import IconUpload from '@/assets/icons/upload_1.svg';

const tabList = [
  {
    key: 'Draw it in',
    label: <p className="text-base font-medium">Draw it in</p>,
  },
  {
    key: 'Use a photo',
    label: <p className="text-base font-medium">Use a photo</p>,
  },
];

const props: UploadProps = {
  name: 'file',
  multiple: false,
  maxCount: 1,
  accept: '.jpg, .jpeg, .png',
  beforeUpload: () => {
    return false;
  },
};

export default function InviteEmail({ form, signRef, activeTab, setActiveTab }: InviteCandidatesProps) {
  const [signWidth, setSignWidth] = useState<number>(0);

  useEffect(() => {
    setSignWidth(document.getElementById('signContent')?.clientWidth as number);
  }, [form]);

  const normFile = (e: any) => {
    if (e?.fileList?.length !== 0 && e?.fileList[0].type.search('image') === -1) return [];
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const handleChangeSubject = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      form?.setFields([{ name: e.target.id, errors: undefined, value: e.target.value }]);
    } else {
      form?.setFields([{ name: e.target.id, errors: ['This is a required field.'], value: e.target.value }]);
    }
  };

  const handleChangeEditor = (content: string, value: string) => {
    if (content !== '') {
      form?.setFields([{ name: value, errors: undefined, value: content }]);
    } else {
      form?.setFields([{ name: value, errors: ['This is a required field.'], value: '' }]);
    }
  };

  const onTabChange = (key: string) => {
    if (setActiveTab) setActiveTab(key);
  };

  const handleClear = () => {
    if (signRef) signRef?.current?.clear();
  };

  return (
    <>
      <Divider />
      <Form.Item
        name="subjectEmail"
        label={
          <>
            Email Subject line<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
          </>
        }
      >
        <Input placeholder="Subject" className="!h-10" onChange={handleChangeSubject} />
      </Form.Item>
      <Divider />
      <Form.Item
        name="bodyEmail"
        label={
          <>
            Description<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
          </>
        }
        getValueFromEvent={(_, editor) => editor.getContent()}
      >
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
          init={{ menubar: false, branding: false, height: 250, placeholder: 'Email text...' }}
          onEditorChange={content => handleChangeEditor(content, 'bodyEmail')}
        />
      </Form.Item>
      <Card id="signContent" tabList={tabList} onTabChange={onTabChange} bodyStyle={{ paddingTop: '1px', paddingLeft: 0, paddingRight: 0 }}>
        {activeTab === 'Draw it in' && (
          <>
            <div className="w-full flex items-center justify-end p-4">
              <Button
                className="!p-0 !w-auto !h-auto"
                type="link"
                icon={<CloseOutlined className="!text-[#294753] hover:!opacity-75" />}
                onClick={handleClear}
              />
            </div>
            <SignaturePad
              penColor="black"
              canvasProps={{ width: signWidth, height: 200 }}
              ref={(rf: SignaturePad | null) => {
                if (signRef) signRef.current = rf;
              }}
            />
          </>
        )}

        {activeTab === 'Use a photo' && (
          <div className="px-4 py-5">
            <Form.Item name="inviteEmailSignFile" valuePropName="fileList" getValueFromEvent={normFile}>
              <Dragger {...props} className="group !bg-white !border-none">
                <div className="flex items-center justify-center">
                  <IconUpload />
                </div>
                <p className="text-sm text-[#4D6670]">
                  <span className="text-[#EF9575] font-semibold">Click to upload</span>&nbsp;
                  <span>or drag and drop</span>
                  <br />
                  <span>PNG, JPG</span>
                </p>
              </Dragger>
            </Form.Item>
          </div>
        )}
      </Card>
    </>
  );
}

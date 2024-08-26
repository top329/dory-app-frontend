'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input } from 'antd';

import TextArea from 'antd/es/input/TextArea';
import { useNewJob } from '@/components';
import { NewJobsProps } from '@/types/new_job';

export default function VideoDescription() {
  const router = useRouter();
  const { recordVideoFile, selectRecordVideoFile, onSubmit, nextSubStep, jobs } = useNewJob();

  const [active, setActive] = useState<boolean>(true);
  const [title, setTitle] = useState<string>((jobs?.videoQuestionTitle as string) || '');
  const [desc, setDesc] = useState<string>((jobs?.videoQuestionDescription as string) || '');

  useEffect(() => {
    if (title !== '' && desc !== '' && recordVideoFile) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [title, desc, setTitle, setDesc, recordVideoFile, selectRecordVideoFile]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    if (id === 'title') setTitle(e.target.value);
    if (id === 'desc') setDesc(e.target.value);
  };

  const handleSubmit = async () => {
    const submit: NewJobsProps = { videoQuestionTitle: title, videoQuestionDescription: desc, videoQuestionFile: recordVideoFile as File };
    void onSubmit(submit, submit);
    nextSubStep();
    router.back();
  };

  return (
    <>
      <h1 className="text-[32px] font-medium leading-9 mb-6">Give a title and description for your video 😁</h1>
      <Form className="!mb-8" layout="vertical">
        <Form.Item label="Video Title">
          <Input
            placeholder="Add video title"
            className="!h-10"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, 'title')}
          />
        </Form.Item>
        <Form.Item label="Video Description">
          <TextArea
            placeholder="Add video description"
            rows={10}
            value={desc}
            onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, 'desc')}
          />
        </Form.Item>
        <Button
          type="primary"
          className={`!w-full !h-11 !rounded-lg ${active ? '!bg-[#B8C2C6]' : '!bg-[#294753]'} hover:!opacity-75`}
          disabled={active}
          onClick={handleSubmit}
        >
          <span className="text-base font-semibold text-white">Save and continue</span>
        </Button>
      </Form>
    </>
  );
}

'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { FormInstance, Form, Input, Row, Col, Button } from 'antd';

import { Select, useNewJob } from '@/components';

import { type VideoQuestionAddContentType } from '@/types/new_job';
import { ANSWER_TIME, THINKING_TIME, TOTAL_TAKES } from '@/types/global';

export default function VideoQuestionAddContent({ form }: { form: FormInstance<any> }) {
  const { selectVideoQuestModule, videoQuestModule, addVideoQuestionContent, videoQuestionContent } = useNewJob();

  const [errorThinkingTime, setErrorThinkingTime] = useState<boolean>(false);
  const [errorAnswerTime, setErrorAnswerTime] = useState<boolean>(false);
  const [errorTotalTake, setErrorTotalTake] = useState<boolean>(false);

  useEffect(() => {
    if (videoQuestModule?.title) {
      form.setFieldValue('title', videoQuestModule?.title);
      form.setFieldValue('details', videoQuestModule?.details);
      form.setFieldValue('thinkingTime', videoQuestModule?.thinkingTime);
      form.setFieldValue('answerTime', videoQuestModule?.answerTime);
      form.setFieldValue('totalTakes', videoQuestModule?.totalTakes);
    }
  }, [form, videoQuestModule]);

  const handleChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      form.setFields([{ name: e.target.id, errors: undefined, value: e.target.value }]);
    } else {
      form.setFields([{ name: e.target.id, errors: ['This is a required field.'], value: '' }]);
    }
  };

  const handleCancel = () => {
    selectVideoQuestModule({ show: false });
    form.resetFields();
  };

  const handleSave = () => {
    let isValidate = false;
    const fields = form.getFieldsValue();

    if (!fields.title || fields.title === '') {
      form.setFields([{ name: 'title', errors: ['This is a required field.'], value: '' }]);
      isValidate = true;
    }

    if (!fields.details || fields.details === '') {
      form.setFields([{ name: 'details', errors: ['This is a required field.'], value: '' }]);
      isValidate = true;
    }

    if (!fields.thinkingTime || fields.thinkingTime === '') {
      form.setFields([{ name: 'thinkingTime', errors: ['This is a required field.'], value: '' }]);
      isValidate = true;
    }

    if (!fields.answerTime || fields.answerTime === '') {
      form.setFields([{ name: 'answerTime', errors: ['This is a required field.'], value: '' }]);
      isValidate = true;
    }

    if (!fields.totalTakes || fields.totalTakes === '') {
      form.setFields([{ name: 'totalTakes', errors: ['This is a required field.'], value: '' }]);
      isValidate = true;
    }

    if (isValidate) return;

    const submit: VideoQuestionAddContentType = {
      ...(!videoQuestModule.title ? { id: videoQuestionContent?.length } : { ...videoQuestModule }),
      show: false,
      title: fields.title,
      details: fields.details,
      thinkingTime: fields.thinkingTime,
      answerTime: fields.answerTime,
      totalTakes: fields.totalTakes,
    };

    if (!videoQuestModule.title) {
      addVideoQuestionContent([...videoQuestionContent, submit]);
    } else {
      videoQuestionContent[videoQuestModule?.id as number] = submit;
      addVideoQuestionContent(videoQuestionContent);
    }

    form.setFields([{ name: 'videoQuestionContent', errors: undefined, value: '' }]);
    selectVideoQuestModule({ show: false });
    form.resetFields();
  };

  return (
    <div className="w-full border border-[#EDEFF1] rounded-lg bg-[#F9FBFC] p-5">
      <div className="w-full bg-[#E4E7E9] px-5 py-[9px] mb-4">
        <p className="text-sm text-black font-semibold">
          Question {videoQuestModule?.title ? (videoQuestModule?.id as number) + 1 : videoQuestionContent.length + 1}
        </p>
      </div>
      <Form.Item
        name="title"
        label={
          <>
            Question title<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
          </>
        }
      >
        <Input className="!h-10" onChange={handleChangeQuestion} placeholder="Please type in your question" />
      </Form.Item>
      <Form.Item
        name="details"
        label={
          <>
            Qustion details<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
          </>
        }
      >
        <Input className="!h-10" onChange={handleChangeQuestion} placeholder="Add more details" />
      </Form.Item>
      <div className="w-full bg-[#E4E7E9] px-5 py-[9px] mb-4">
        <p className="text-sm text-black font-semibold">Answer Setting</p>
      </div>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="thinkingTime"
            label={
              <>
                Thinking time<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
              </>
            }
          >
            <Select
              form={form}
              options={THINKING_TIME}
              className="w-full h-10 cursor-pointer bg-white"
              placeholder="Select"
              searchable={false}
              error={errorThinkingTime}
              setError={setErrorThinkingTime}
              errorMessage="This is a required field."
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="answerTime"
            label={
              <>
                Answer time<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
              </>
            }
          >
            <Select
              form={form}
              options={ANSWER_TIME}
              className="w-full h-10 cursor-pointer bg-white"
              placeholder="Select"
              searchable={false}
              error={errorAnswerTime}
              setError={setErrorAnswerTime}
              errorMessage="This is a required field."
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="totalTakes"
            label={
              <>
                Total takes<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
              </>
            }
          >
            <Select
              form={form}
              options={TOTAL_TAKES}
              className="w-full h-10 cursor-pointer bg-white"
              placeholder="Select"
              searchable={false}
              error={errorTotalTake}
              setError={setErrorTotalTake}
              errorMessage="This is a required field."
            />
          </Form.Item>
        </Col>
      </Row>
      <div className="px-4 py-3 flex items-center justify-end gap-4">
        <Button type="default" className="!border-gray-300 !text-[#344054] hover:!opacity-75" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="primary" className="!bg-mainColor hover:!opacity-75" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

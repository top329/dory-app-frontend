'use client';

import { useEffect, useState } from 'react';
import { Button, Divider, Form } from 'antd';

import { useSelector } from '@/features/store';

import { useNewJob, Alert, Select, VideoQuestionContent } from '@/components';
import { NewJobsProps, type VideoQuestionAddContentType } from '@/types/new_job';
import { ANSWER_TIME, Option, THINKING_TIME } from '@/types/global';

import { PlusOutlined } from '@ant-design/icons';

export default function CandidatesVideoAnswer() {
  const { jobInit } = useSelector(state => state.newJob);
  const {
    form,
    prevSubStep,
    videoQuestModule,
    selectVideoQuestModule,
    addVideoQuestionContent,
    videoQuestionContent,
    onSubmit,
    nextStep,
    nextSubStep,
  } = useNewJob();

  const [alert, setAlert] = useState<boolean>(true);
  const [errorTemplate, setErrorTemplate] = useState<boolean>(false);

  useEffect(() => {}, [selectVideoQuestModule, videoQuestionContent, addVideoQuestionContent]);

  const handleTemlateChange = (item: Option) => {
    const videoTemplates = item?.content?.map((rs: VideoQuestionAddContentType, key: number) => {
      const thinkingTime = THINKING_TIME.find(f => Number(f.value) === Number(rs.thinkingTime));
      const answerTime = ANSWER_TIME.find(f => Number(f.value) === Number(rs.answerTime));

      return {
        ...rs,
        id: key,
        show: false,
        thinkingTime: thinkingTime?.label,
        answerTime: answerTime?.label,
      };
    });

    addVideoQuestionContent(videoTemplates as VideoQuestionAddContentType[]);
    form.setFields([{ name: 'videoQuestionContent', errors: undefined, value: '' }]);
    form.setFieldValue('videoQuestionTemplateId', item.label);
  };

  const handleSubmit = async (data: NewJobsProps) => {
    if (videoQuestionContent?.length === 0) {
      form.setFields([{ name: 'videoQuestionContent', errors: ['This is a required'], value: '' }]);
      return;
    }

    const template = jobInit?.videoQuestions?.find((rs: Option) => rs.label === data.videoQuestionTemplateId);

    const candidateVideoQuestions: VideoQuestionAddContentType[] = videoQuestionContent?.map((rs: VideoQuestionAddContentType) => {
      const findThink = THINKING_TIME.find((f: Option) => f.label === rs.thinkingTime);
      const findAnswer = ANSWER_TIME.find((f: Option) => f.label === rs.answerTime);

      return {
        title: rs.title,
        details: rs.details,
        thinkingTime: findThink?.value,
        answerTime: findAnswer?.value,
        totalTakes: rs.totalTakes,
      };
    });

    void onSubmit(
      { candidateVideoQuestions, videoQuestionTemplateId: template?.value },
      { candidateVideoQuestions: videoQuestionContent, videoQuestionTemplateId: data.videoQuestionTemplateId }
    );
    nextStep();
    nextSubStep();
  };

  return (
    <Form
      className="!mb-8"
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ thinkingTime: 'Unlimited', answerTime: '2m', totalTakes: '3' }}
      id="form"
    >
      <div className="px-10 py-8 border-b border-b-[#EDEFF1]">
        <h1 className="text-2xl font-medium text-center mb-10">Add Candidate Video Answer</h1>
        <Alert
          className="bg-[#FCF1D4] bg-opacity-60 border border-[#FCF1D4] mb-9"
          show={alert}
          value={
            <p className="text-[#785623] text-base leading-[20px]">
              You can use a template from a question that you created before, or you can also create a new question
            </p>
          }
          onClose={() => setAlert(false)}
        />
        <Form.Item
          name="videoQuestionTemplateId"
          label={
            <>
              Select template<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
            </>
          }
        >
          <Select
            form={form}
            options={jobInit?.videoQuestions as Option[]}
            className="w-full h-10 cursor-pointer"
            placeholder="Select template"
            searchable={false}
            error={errorTemplate}
            setError={setErrorTemplate}
            errorMessage="This is a required field."
            onChangeValue={handleTemlateChange}
          />
        </Form.Item>
        <>
          <VideoQuestionContent form={form} />
          <Divider />

          {!videoQuestModule.show && (
            <Form.Item name="videoQuestionContent">
              <Button
                type="dashed"
                className="!w-full !h-11 !text-start !border-[#EAE7E6] !bg-[#F8F8F8]"
                icon={<PlusOutlined className="!text-[#050505]" />}
                onClick={() => selectVideoQuestModule({ show: true })}
              >
                <span className="text-[#050505] text-base">Add new question...</span>
              </Button>
            </Form.Item>
          )}
        </>
      </div>
      <div className="flex items-center justify-between px-4 py-6">
        <Button
          type="default"
          className="!h-9 !border-gray-300 !text-[#344054] hover:!opacity-75"
          onClick={prevSubStep}
          disabled={videoQuestModule.show}
        >
          Back
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className={`!h-9 ${videoQuestModule.show ? '!bg-[#0000000a]' : '!bg-mainColor'} hover:!opacity-75`}
          disabled={videoQuestModule.show}
        >
          Next
        </Button>
      </div>
    </Form>
  );
}

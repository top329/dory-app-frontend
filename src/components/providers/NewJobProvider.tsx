'use client';

import React, { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  NewJobsProps,
  QuestionKindEnum,
  QuestionTitleEnum,
  type QuestionAddContentType,
  VideoQuestionAddContentType,
} from '@/types/new_job';
import { Form, FormInstance, StepProps } from 'antd';
import { useDispatch, useSelector } from '@/features/store';

import IconCheck from '@/assets/icons/check.svg';
import { setNewJobData, setPreviewJobData } from '@/features/projects';

type Context = {
  jobs: NewJobsProps | null;
  prevJobs: NewJobsProps | null;
  form: FormInstance<any>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  questModule: QuestionAddContentType;
  selectQuestModule: (module: QuestionAddContentType) => void;
  step: number;
  subStep: number;
  prevStep: () => void;
  nextStep: (step?: number) => void;
  prevSubStep: () => void;
  nextSubStep: (subStep?: number) => void;
  stepItems: StepProps[] | undefined;
  onSubmit: (data: NewJobsProps, prevData?: NewJobsProps) => Promise<void>;
  answerContent: QuestionAddContentType[];
  addAnswerContent: (content: QuestionAddContentType[]) => void;
  videoStep: number;
  nextVideoStep: (step?: number) => void;
  prevVideoStep: () => void;
  recordVideoFile: File | null;
  selectRecordVideoFile: (file: File | null) => void;
  videoQuestModule: VideoQuestionAddContentType;
  selectVideoQuestModule: (module: VideoQuestionAddContentType) => void;
  videoQuestionContent: VideoQuestionAddContentType[];
  addVideoQuestionContent: (content: VideoQuestionAddContentType[]) => void;
};

const NewJobContext = createContext<Context | null>(null);

export function NewJobProvider({ children }: { children: ReactNode }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  //@ts-ignore
  const { jobs, prevJobs } = useSelector(state => state.newJob);
  const query = useSearchParams();

  const [step, setStep] = useState<number>(query.get('step') ? Number(query.get('step')) : 0);
  const [subStep, setSubStep] = useState<number>(query.get('substep') ? Number(query.get('substep')) : 0);
  const [modal, setModal] = useState<boolean>(false);
  const [questModule, setQuestModule] = useState<QuestionAddContentType>({
    kind: QuestionKindEnum.empty,
    title: QuestionTitleEnum.empty,
    icon: <></>,
    show: false,
    question: '',
    required: 'Optional',
    answers: [{ answer: '', id: 0 }],
  });
  const [answerContent, setAnswerContent] = useState<QuestionAddContentType[]>([]);
  const [videoStep, setVideoStep] = useState<number>(1);
  const [recordVideoFile, setRecordVideoFile] = useState<File | null>(null);
  const [videoQuestModule, setVideoQuestModule] = useState<VideoQuestionAddContentType>({
    show: false,
    title: '',
    details: '',
    thinkingTime: 'Unlimited',
    answerTime: '2m',
    totalTakes: '3',
    required: 'Optional',
  });
  const [videoQuestionContent, setVideoQuestionContent] = useState<VideoQuestionAddContentType[]>([]);

  const stepItems: StepProps[] | undefined = [
    {
      title: <span className="text-lg leading-[20px]">Step 1 : About Job</span>,
      description: (
        <>
          <div className="flex items-center gap-1">
            {step >= 0 && subStep > 0 ? <IconCheck /> : <div className="w-5">&nbsp;</div>}
            <p
              className={`text-base leading-[22px] ${
                step >= 0 && subStep >= 0 ? '!text-black' : '!text-black !opacity-50'
              }`}
            >
              Job Information
            </p>
          </div>
          <div className="flex items-center gap-1">
            {step >= 0 && subStep > 1 ? <IconCheck /> : <div className="w-5">&nbsp;</div>}
            <p
              className={`text-base leading-[22px] ${
                step >= 0 && subStep >= 1 ? '!text-black' : '!text-black !opacity-50'
              }`}
            >
              Job Details
            </p>
          </div>
        </>
      ),
    },
    {
      title: <span className="text-lg leading-[20px]">Step 2 : Qualification Question</span>,
      description: (
        <>
          <div className="flex items-center gap-1">
            {step >= 1 && subStep > 2 ? <IconCheck /> : <div className="w-5">&nbsp;</div>}
            <p
              className={`text-base leading-[22px] ${
                step >= 1 && subStep >= 2 ? '!text-black' : '!text-black !opacity-50'
              }`}
            >
              Qualification question
            </p>
          </div>
        </>
      ),
    },
    {
      title: <span className="text-lg leading-[20px]">Step 3 : Videos</span>,
      description: (
        <>
          <div className="flex items-center gap-1">
            {step >= 2 && subStep > 3 ? <IconCheck /> : <div className="w-5">&nbsp;</div>}
            <p
              className={`text-base leading-[22px] ${
                step >= 2 && subStep >= 3 ? '!text-black' : '!text-black !opacity-50'
              }`}
            >
              Add Intro Video
            </p>
          </div>
          <div className="flex items-center gap-1">
            {step >= 2 && subStep > 4 ? <IconCheck /> : <div className="w-5">&nbsp;</div>}
            <p
              className={`text-base leading-[22px] ${
                step >= 2 && subStep >= 4 ? '!text-black' : '!text-black !opacity-50'
              }`}
            >
              Candidates Video Answer
            </p>
          </div>
        </>
      ),
    },
    {
      title: <span className="text-lg leading-[20px]">Step 4: Workflow</span>,
      description: (
        <>
          <div className="flex items-center gap-1">
            {step >= 3 && subStep > 5 ? <IconCheck /> : <div className="w-5">&nbsp;</div>}
            <p
              className={`text-base leading-[22px] ${
                step >= 3 && subStep >= 5 ? '!text-black' : '!text-black !opacity-50'
              }`}
            >
              Select Workflow
            </p>
          </div>
        </>
      ),
    },
    {
      title: <span className="text-lg leading-[20px]">Step 5: Summary</span>,
      description: (
        <>
          <div className="flex items-center gap-1">
            {step >= 4 && subStep > 6 ? <IconCheck /> : <div className="w-5">&nbsp;</div>}
            <p
              className={`text-base leading-[22px] ${
                step >= 4 && subStep >= 6 ? '!text-black' : '!text-black !opacity-50'
              }`}
            >
              Preview Job
            </p>
          </div>
        </>
      ),
    },
    {
      title: <span className="text-lg leading-[20px]">Step 6 : Share</span>,
      description: (
        <>
          <div className="flex items-center gap-1">
            {step >= 5 && subStep > 7 ? <IconCheck /> : <div className="w-5">&nbsp;</div>}
            <p
              className={`text-base leading-[22px] ${
                step >= 5 && subStep >= 7 ? '!text-black' : '!text-black !opacity-50'
              }`}
            >
              Share the job
            </p>
          </div>
        </>
      ),
    },
  ];

  const selectQuestModule = (module: QuestionAddContentType) => {
    setQuestModule(module);
  };

  const selectVideoQuestModule = (module: VideoQuestionAddContentType) => {
    setVideoQuestModule(module);
  };

  const prevStep = useCallback(() => {
    setStep(prev => prev - 1);
  }, [step, jobs]);

  const nextStep = useCallback(
    (step?: number) => {
      if (step !== undefined) {
        setStep(step);
      } else {
        setStep(prev => prev + 1);
      }
    },
    [step, jobs]
  );

  const prevSubStep = useCallback(() => {
    setSubStep(prev => prev - 1);
  }, [step, subStep, jobs]);

  const nextSubStep = useCallback(
    (subStep?: number) => {
      if (subStep !== undefined) {
        setSubStep(subStep);
      } else {
        setSubStep(prev => prev + 1);
      }
    },
    [step, subStep, jobs]
  );

  const prevVideoStep = useCallback(() => {
    setVideoStep(prev => prev - 1);
  }, [videoStep, setVideoStep, jobs]);

  const nextVideoStep = useCallback(
    (step?: number) => {
      if (step !== undefined) {
        setVideoStep(step);
      } else {
        setVideoStep(prev => prev + 1);
      }
    },
    [videoStep, setVideoStep, jobs]
  );

  const selectRecordVideoFile = (file: File | null) => {
    setRecordVideoFile(file);
  };

  const addAnswerContent = (content: QuestionAddContentType[]) => {
    setAnswerContent(content);
  };

  const addVideoQuestionContent = (content: VideoQuestionAddContentType[]) => {
    setVideoQuestionContent(content);
  };

  const onSubmit = useCallback(
    async (data: NewJobsProps, prevData?: NewJobsProps) => {
      dispatch(setNewJobData({ ...jobs, ...data }));

      if (prevData) {
        dispatch(setPreviewJobData({ ...prevJobs, ...prevData }));
      }
    },
    [jobs, step, setStep, subStep, setSubStep]
  );

  return (
    <NewJobContext.Provider
      value={{
        jobs,
        prevJobs,
        form,
        modal,
        setModal,
        questModule,
        selectQuestModule,
        videoQuestModule,
        selectVideoQuestModule,
        step,
        subStep,
        nextStep,
        nextSubStep,
        prevStep,
        prevSubStep,
        stepItems,
        onSubmit,
        answerContent,
        addAnswerContent,
        videoStep,
        nextVideoStep,
        prevVideoStep,
        recordVideoFile,
        selectRecordVideoFile,
        addVideoQuestionContent,
        videoQuestionContent,
      }}
    >
      {children}
    </NewJobContext.Provider>
  );
}

export function useNewJob(): Context {
  const context = useContext(NewJobContext);

  if (context === null) {
    throw new Error('useNewJob must be used within an NewJobProvider');
  }

  return context;
}

'use client';

import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { StepProps, Form, FormInstance } from 'antd';

import { useDispatch, useSelector } from '@/features/store';
import { setSignupData } from '@/features/projects/auth';

import type { SignupProps } from '@/types/auth';

type Context = {
  signup: SignupProps | null;
  form: FormInstance<any>;
  step: number;
  prevStep: () => void;
  nextStep: () => void;
  onSubmit: (data: SignupProps) => Promise<void>;
  stepItems: StepProps[] | undefined;
};

const AuthContext = createContext<Context | null>(null);

export function SignupInitialProvider({ children }: { children: ReactNode }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { signup } = useSelector(state => state.auth);

  const [step, setStep] = useState<number>(-1);

  const stepItems: StepProps[] | undefined = [
    {
      title: <span className="text-lg leading-[20px]">Select default language</span>,
      description: <span className="text-base leading-[22px]">Lorem ipsum is placeholder text commonly</span>,
    },
    {
      title: <span className="text-lg leading-[20px]">Company weekday start date.</span>,
      description: <span className="text-base leading-[22px]">Lorem ipsum is placeholder text commonly</span>,
    },
    {
      title: <span className="text-lg leading-[20px]">Select Country</span>,
      description: <span className="text-base leading-[22px]">Lorem ipsum is placeholder text commonly</span>,
    },
    {
      title: <span className="text-lg leading-[20px]">Select Timezone</span>,
      description: <span className="text-base leading-[22px]">Lorem ipsum is placeholder text commonly</span>,
    },
    {
      title: <span className="text-lg leading-[20px]">Company Settings</span>,
      description: <span className="text-base leading-[22px]">Lorem ipsum is placeholder text commonly</span>,
    },
    {
      title: <span className="text-lg leading-[20px]">Setting up your company profile on page</span>,
      description: <span className="text-base leading-[22px]">Lorem ipsum is placeholder text commonly</span>,
    },
  ];

  const prevStep = useCallback(() => {
    setStep(prev => prev - 1);
  }, [step, signup]);

  const nextStep = useCallback(() => {
    setStep(prev => prev + 1);
  }, [step, signup]);

  const onSubmit = useCallback(
    async (data: SignupProps) => {
      dispatch(setSignupData({ ...signup, ...data }));
    },
    [signup, step, setStep]
  );

  return <AuthContext.Provider value={{ signup, stepItems, step, nextStep, prevStep, onSubmit, form }}>{children}</AuthContext.Provider>;
}

export function useSignupInitial(): Context {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('useSignupInitial must be used within an SignupInitialProvider');
  }

  return context;
}

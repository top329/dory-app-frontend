'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import SignupForm from './SignupForm';

import { useCheckEmailPhoneMutation, setSignupData, useSetVerifyCodeRequestMutation } from '@/features/projects/auth';
import { useSelector, useDispatch } from '@/features/store';

import { useNotifications } from '@/utils';
import { SignupProps } from '@/types/auth';
import { ApiResponse } from '@/types/global';

export default function EmailSignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { message } = useNotifications();
  const { signup } = useSelector(state => state.auth);

  const [checkEmailPhone] = useCheckEmailPhoneMutation();
  const [setVerifyCodeRequest] = useSetVerifyCodeRequestMutation();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(
    async (data: SignupProps) => {
      setLoading(true);

      const res = (await checkEmailPhone({ authKey: data.email as string, kind: 2 })) as { data: ApiResponse<void> };
      if (res?.data.code === 200) dispatch(setSignupData({ ...signup, email: data.email }));

      const request = (await setVerifyCodeRequest({ authKey: data.email as string })) as { data: ApiResponse<void> };

      if (request?.data.code === 200) {
        message.success(request?.data?.msg);
        router.push('/verification?index=email&type=signup');
      }
      // router.push('/signup/phone');

      setLoading(false);
    },
    [router, signup]
  );

  return <SignupForm loading={loading} onSubmit={onSubmit} />;
}

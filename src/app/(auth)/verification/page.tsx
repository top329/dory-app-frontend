'use client';

import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import VerificationForm from './VerificationForm';
import { useSetFinishLoginMutation, useSetVerifyCodeRequestMutation, useSetVerifyCodeMutation } from '@/features/projects/auth';
import { UserResponse } from '@/types/auth';
import { ApiResponse } from '@/types/global';
import { useSelector } from '@/features/store';

export default function VerificationPage() {
  const router = useRouter();
  const query = useSearchParams();
  const { signup } = useSelector(state => state.auth);

  const index = query.get('index');
  const type = query.get('type');

  const [setFinishLogin, { isLoading }] = useSetFinishLoginMutation();
  const [setVerifyCodeRequest] = useSetVerifyCodeRequestMutation();
  const [setVerifyCode] = useSetVerifyCodeMutation();

  const [error, setError] = useState<number>(200);

  const handleResent = async () => {
    let authKey: string | false | null = index === 'email' ? (signup?.email as string) : (signup?.phoneNumber as string);

    if (type === 'login') {
      authKey = typeof window !== 'undefined' && window.sessionStorage.getItem('username');
    }

    await setVerifyCodeRequest({ authKey: authKey as string });
  };

  const onSubmit = useCallback(
    async (data: { code_1: string; code_2: string; code_3: string; code_4: string; code_5: string; code_6: string }) => {
      let authKey: string | false | null = index === 'email' ? (signup?.email as string) : (signup?.phoneNumber as string);
      const otp = data.code_1 + data.code_2 + data.code_3 + data.code_4 + data.code_5 + data.code_6;

      if (type === 'login') {
        authKey = typeof window !== 'undefined' && window.sessionStorage.getItem('username');

        const res = (await setFinishLogin({ authKey: authKey as string, otp: parseInt(otp, 10) })) as { data: ApiResponse<UserResponse> };
        setError(res?.data?.code);

        if (res?.data?.code === 200) {
          typeof window !== 'undefined' && window.sessionStorage.removeItem('username');
          router.replace('/');
        }
      }

      if (type === 'signup') {
        const res = (await setVerifyCode({ authKey: authKey as string, otp: parseInt(otp, 10) })) as { data: ApiResponse<void> };
        setError(res?.data?.code);

        if (res?.data?.code === 200) {
          if (index === 'email') router.replace('/signup/phone');
          if (index === 'phone') router.replace('/signup/password');
        }
      }
    },
    [router]
  );

  return (
    <>
      <VerificationForm loading={isLoading} error={error} onResent={handleResent} onSubmit={onSubmit} />
    </>
  );
}

'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import LoginForm from './LoginForm';
import { UserProps } from '@/types/auth';
import { useSetRequestLoginMutation } from '@/features/projects/auth';
import { cryptoEncryptPwd, useNotifications } from '@/utils';
import { ApiResponse } from '@/types/global';

export default function LoginPage() {
  const router = useRouter();
  const [setRequestLogin, { isLoading }] = useSetRequestLoginMutation();
  const { message } = useNotifications();

  const onSubmit = useCallback(
    async (data: UserProps) => {
      const encrypt = cryptoEncryptPwd(data.password as string);
      const submitData = { username: data.username, password: encrypt.pwd, phrase: encrypt.phrase };

      const signIn = (await setRequestLogin(submitData)) as { data: ApiResponse<void> };

      if (signIn?.data?.code === 200) {
        message.success(signIn?.data?.msg);
        typeof window !== 'undefined' && window.sessionStorage.setItem('username', data.username as string);

        if (data?.username?.search('@') !== -1) {
          router.push('/verification?index=email&type=login');
        } else {
          router.push('/verification?index=phone&type=login');
        }
      }
    },
    [router]
  );

  return (
    <>
      <LoginForm loading={isLoading} onSubmit={onSubmit} />
    </>
  );
}

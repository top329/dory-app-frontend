'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { useDispatch, useSelector } from '@/features/store';
import { setSignupData } from '@/features/projects/auth';

import SignupForm from './SignupForm';
import { cryptoEncryptPwd } from '@/utils';

export default function PasswordSignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { signup } = useSelector(state => state.auth);

  const onSubmit = useCallback(async (data: { firstName: string; lastName: string; password: string }) => {
    const encrypt = cryptoEncryptPwd(data.password as string);
    dispatch(setSignupData({ ...signup, firstName: data.firstName, lastName: data.lastName, password: encrypt.pwd, phrase: encrypt.phrase }));
    router.push('/initial/steps');
  }, []);

  return <SignupForm onSubmit={onSubmit} />;
}

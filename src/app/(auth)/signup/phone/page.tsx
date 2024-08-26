'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import SignupForm from './SignupForm';

import { setSignupData, useCheckEmailPhoneMutation, useSetVerifyCodeRequestMutation } from '@/features/projects/auth';
import { useSelector, useDispatch } from '@/features/store';

import { useNotifications } from '@/utils';
import { ApiResponse, Option, PHONE_CODE } from '@/types/global';

export default function PhoneSignupForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { message } = useNotifications();
  const { signup } = useSelector(state => state.auth);

  const [checkEmailPhone] = useCheckEmailPhoneMutation();
  const [setVerifyCodeRequest] = useSetVerifyCodeRequestMutation();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(
    async (data: { phone: string; code: string }) => {
      setLoading(true);

      const findCode = PHONE_CODE.find((rs: Option) => rs.label === data.code);

      const authKey = findCode?.code + data.phone;
      const res = (await checkEmailPhone({ authKey, kind: 1 })) as { data: ApiResponse<undefined> };

      if (res?.data) dispatch(setSignupData({ ...signup, phoneNumber: authKey }));
      const request = (await setVerifyCodeRequest({ authKey })) as { data: ApiResponse<undefined> };

      if (request?.data?.code === 200) {
        message.success(request?.data?.msg);
        router.push('/verification?index=phone&type=signup');
      }

      setLoading(false);
    },
    [router, signup]
  );

  return <SignupForm loading={loading} onSubmit={onSubmit} />;
}

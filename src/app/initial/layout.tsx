'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Layout } from 'antd';
import { SignupInitialProvider } from '@/components/providers/SignupInitialProvider';

import { useSelector } from '@/features/store';

import IconLogo from '@/assets/icons/logo_white.svg';

const { Content, Header } = Layout;

export default function InitialSettingLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { signup } = useSelector(state => state.auth);

  useEffect(() => {
    if (!signup) router.replace('/signup/email');
  }, [signup]);

  return (
    <Layout className="w-full h-full">
      <Header className="w-full !h-[75px] !border-b !border-b-[#3A3A3C] flex items-center justify-between !bg-[#29292A] !px-[34px] z-10">
        <Link href="/">
          <IconLogo />
        </Link>
      </Header>
      <Content>
        <SignupInitialProvider>{children}</SignupInitialProvider>
      </Content>
    </Layout>
  );
}

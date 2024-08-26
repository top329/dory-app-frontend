'use client';

import { ReactNode, useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Headers, SideBar } from '@/container';
import { useAuth } from '@/components';

const { Content } = Layout;

export default function MainLayout({ children }: { children: ReactNode }) {
  const [broken, setBroken] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { getSelectMember } = useAuth();

  useEffect(() => {
    getSelectMember();
  }, [children]);

  return (
    <>
      <Layout className="!min-h-full">
        <Headers />
        <Layout className="!flex !flex-row h-full">
          <SideBar broken={broken} setBroken={setBroken} collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content className="bg-[#fff] w-full">{children}</Content>
        </Layout>
      </Layout>
    </>
  );
}

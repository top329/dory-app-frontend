'use client';

import { ReactNode } from 'react';
import { Layout } from 'antd';

import { Headers } from '@/container';
import { NewJobProvider, useAuth, WorkflowProvider } from '@/components';

import { useGetJobInitDataQuery } from '@/features/projects';

const { Content } = Layout;

export default function NewJobLayout({ children }: { children: ReactNode }) {
  const { member } = useAuth();
  useGetJobInitDataQuery(member?.companyId as number);

  return (
    <NewJobProvider>
      <WorkflowProvider>
        <Layout className="!h-full">
          <Headers />
          <Content>{children}</Content>
        </Layout>
      </WorkflowProvider>
    </NewJobProvider>
  );
}

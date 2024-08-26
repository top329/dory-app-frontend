'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { Layout, Steps, Button, Row, Col } from 'antd';

import { useNewJob } from '@/components';

import IconBackArrow from '@/assets/icons/arrow_down.svg';

const { Sider, Content } = Layout;

export default function UpdateJobPage() {
  const router = useRouter();
  const { step, nextStep, subStep, nextSubStep, stepItems } = useNewJob();
  const query = useSearchParams();
  const param = useParams();

  useEffect(() => {
    if (query.get('step') && query.get('substep')) {
      nextStep(parseInt(query.get('step') as string, 10));
      nextSubStep(parseInt(query.get('substep') as string, 10));
    }
  }, [query, nextStep, nextSubStep]);

  return <></>;
}

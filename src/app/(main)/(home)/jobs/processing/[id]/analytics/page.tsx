'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, Col, Divider, Row } from 'antd';

import { BarChart, LineChart, PieChart, Select, StatisticItem, useAuth } from '@/components';

import {
  useGetAnalyticsInfoQuery,
  useLazyGetAnalyticsEngagedInfoQuery,
  useLazyGetAnalyticsOvertimeInfoQuery,
  useLazyGetAnalyticsPipelineInfoQuery,
} from '@/features/projects';
import { useSelector } from '@/features/store';
import { Option } from '@/types/global';
import { calcYears, useNotifications } from '@/utils';

import IconUsers from '@/assets/icons/users_2.svg';
import IconUserDelete from '@/assets/icons/user-delete.svg';
import IconUserAdd from '@/assets/icons/user-add.svg';
import IconClockCheck from '@/assets/icons/clock-check.svg';
import IconClock from '@/assets/icons/clock_1.svg';
import IconCalendar from '@/assets/icons/calendar.svg';

export default function Analytics() {
  const param = useParams();
  const { message } = useNotifications();
  const { member } = useAuth();
  const { analytics } = useSelector(state => state.candidate);
  const { isLoading: isGetAnalytics } = useGetAnalyticsInfoQuery({
    companyId: Number(member?.companyId),
    jobId: Number(param?.id),
    year: new Date().getFullYear(),
  });
  const [getOvertimeInfo, { isLoading: isOvertime }] = useLazyGetAnalyticsOvertimeInfoQuery();
  const [getEngagedInfo, { isLoading: isEngaged }] = useLazyGetAnalyticsEngagedInfoQuery();
  const [getPipelineInfo, { isLoading: isPipeline }] = useLazyGetAnalyticsPipelineInfoQuery();

  const [overtime, setOvertime] = useState<{ label: string[]; value: number[] }>({ label: [], value: [] });
  const [engaged, setEngaged] = useState<{ label: string[]; value: number[] }>({ label: [], value: [] });
  const [pipeline, setPipeline] = useState<{ label: string[]; value: number[] }>({ label: [], value: [] });

  const statisticItems = [
    {
      score: analytics?.totalCandidateCnt?.toString() || '0',
      icon: <IconUsers />,
      title: 'Total candidates',
      status: 'Profile created',
      value: 'All times',
    },
    {
      score: analytics?.disqualifiedCandidateCnt?.toString() || '0',
      icon: <IconUserDelete />,
      title: 'Disqualified candidates',
      status: 'Cand. disqualified',
      value: 'All times',
    },
    {
      score: analytics?.hiredCandidateCnt?.toString() || '0',
      icon: <IconUserAdd />,
      title: 'Hired candidates',
      status: 'Candidates hired',
      value: 'All times',
    },
    {
      score: `${analytics?.hireTime?.toString() || '0'} d`,
      icon: <IconClockCheck />,
      title: 'Time to hire',
      status: 'Candidates hired',
      value: 'All times',
    },
    {
      score: `${analytics?.disqualifiedTime?.toString() || '0'} d`,
      icon: <IconClock />,
      title: 'Time to diqualify',
      status: 'Cand. disqualified',
      value: 'All times',
    },
  ];

  useEffect(() => {
    setOvertime(analytics?.candidateOvertime as { label: string[]; value: number[] });
    setEngaged(analytics?.engagedCandidate as { label: string[]; value: number[] });
    setPipeline(analytics?.pipelineBreakDown as { label: string[]; value: number[] });
  }, [analytics]);

  const handleChangeYear = async (item: Option, kind: string) => {
    if (kind === 'overtime') {
      const resData = await getOvertimeInfo({
        companyId: Number(member?.companyId),
        jobId: Number(param?.id),
        year: Number(item.label),
      }).unwrap();

      if (resData?.code === 200) {
        setOvertime(resData?.data as { label: string[]; value: number[] });
      } else {
        message.error(resData?.msg);
      }
    }

    if (kind === 'engaged') {
      const resData = await getEngagedInfo({
        companyId: Number(member?.companyId),
        jobId: Number(param?.id),
        year: Number(item.label),
      }).unwrap();

      if (resData?.code === 200) {
        setEngaged(resData?.data as { label: string[]; value: number[] });
      } else {
        message.error(resData?.msg);
      }
    }

    if (kind === 'pipeline') {
      const resData = await getPipelineInfo({
        companyId: Number(member?.companyId),
        jobId: Number(param?.id),
        year: Number(item.label),
      }).unwrap();

      if (resData?.code === 200) {
        setPipeline(resData?.data as { label: string[]; value: number[] });
      } else {
        message.error(resData?.msg);
      }
    }
  };

  return (
    <>
      <div className="w-full flex items-start gap-4">
        {statisticItems.map((item, key: number) => (
          <StatisticItem key={key} item={item} isLoading={isGetAnalytics} />
        ))}
      </div>
      <Divider />
      <Card className="!mb-6" loading={isGetAnalytics ? isGetAnalytics : isOvertime}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Candidate Overtime</h3>
            <p className="text-sm font-medium">
              Profile Created : <span className="text-[#666666]">All times</span>
            </p>
          </div>
          <Select
            options={calcYears()}
            className="w-[110px] h-10 cursor-pointer"
            startIcon={<IconCalendar />}
            value={new Date().getFullYear().toString()}
            onChangeValue={(item: Option) => handleChangeYear(item, 'overtime')}
          />
        </div>
        <div className="w-full h-[308px]">
          <LineChart values={overtime} />
        </div>
      </Card>
      <Row gutter={24}>
        <Col span={12}>
          <Card loading={isGetAnalytics ? isGetAnalytics : isEngaged}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Engaged Candidate</h3>
                <p className="text-sm font-medium">
                  Profile Created : <span className="text-[#666666]">All times</span>
                </p>
              </div>
              <Select
                options={calcYears()}
                className="w-[110px] h-10 cursor-pointer"
                startIcon={<IconCalendar />}
                value={new Date().getFullYear().toString()}
                onChangeValue={(item: Option) => handleChangeYear(item, 'engaged')}
              />
            </div>
            <div className="w-full h-[266px]">
              <BarChart values={engaged} />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card loading={isGetAnalytics ? isGetAnalytics : isPipeline}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Current Pipeline Breakdown</h3>
                <p className="text-sm font-medium">
                  Profile Created : <span className="text-[#666666]">All times</span>
                </p>
              </div>
              <Select
                options={calcYears()}
                className="w-[110px] h-10 cursor-pointer"
                startIcon={<IconCalendar />}
                value={new Date().getFullYear().toString()}
                onChangeValue={(item: Option) => handleChangeYear(item, 'pipeline')}
              />
            </div>
            <div>
              <PieChart values={pipeline} />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

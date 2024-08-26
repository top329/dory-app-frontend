import { Card, Col, Row, Skeleton } from 'antd';

import { useSelector } from '@/features/store';

import IconChart from '@/assets/icons/chart-breakout-circle.svg';
import IconInfo from '@/assets/icons/info-circle.svg';

export default function Statistic({ isLoading }: { isLoading: boolean }) {
  const { dashboard } = useSelector(state => state.dashboard);

  return (
    <Card className="!border-[#EAE7E6]">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 bg-[#F9F9F9] rounded-lg flex items-center justify-center">
          <IconChart />
        </div>
        <h3 className="text-xl text-black font-semibold">Overview Statistic</h3>
      </div>
      <Row gutter={16}>
        <Col span={8}>
          <Skeleton loading={isLoading} active>
            <div className="w-full rounded-lg bg-[#F9F9F9] p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-[9px] h-[9px] bg-[#726DFF] rounded-full"></div>
                <p className="text-base font-semibold">Total Responses</p>
                <IconInfo />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-medium">{dashboard?.totalResponseCnt}</h1>
                <div className="w-[90px] h-5 rounded-[46px] bg-[#726DFF] flex items-center justify-center text-xs text-white font-medium">
                  {dashboard?.weekResponseCnt} This week
                </div>
              </div>
              <p className="text-sm font-medium">Total responses</p>
            </div>
          </Skeleton>
        </Col>
        <Col span={8}>
          <Skeleton loading={isLoading} active>
            <div className="w-full rounded-lg bg-[#F9F9F9] p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-[9px] h-[9px] bg-[#EBB6D2] rounded-full"></div>
                <p className="text-base font-semibold">Total Candidates</p>
                <IconInfo />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-medium">{dashboard?.totalCandidateCnt}</h1>
                <div className="w-[90px] h-5 rounded-[46px] bg-[#EBB6D2] flex items-center justify-center text-xs text-[#050505] font-medium">
                  {dashboard?.weekCandidateCnt} This week
                </div>
              </div>
              <p className="text-sm font-medium">Total candidates</p>
            </div>
          </Skeleton>
        </Col>
        <Col span={8}>
          <Skeleton loading={isLoading} active>
            <div className="w-full rounded-lg bg-[#F9F9F9] p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-[9px] h-[9px] bg-[#01755E] rounded-full"></div>
                <p className="text-base font-semibold">Active Jobs</p>
                <IconInfo />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-medium">{dashboard?.totalActiveJobCnt}</h1>
                <div className="w-[90px] h-5 rounded-[46px] bg-[#01755E] flex items-center justify-center text-xs text-white font-medium">
                  {dashboard?.weekActiveJobCnt} This week
                </div>
              </div>
              <p className="text-sm font-medium">Total your job post</p>
            </div>
          </Skeleton>
        </Col>
      </Row>
    </Card>
  );
}

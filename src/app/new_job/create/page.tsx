'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Layout, Steps, Button, Row, Col } from 'antd';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';

import JobInformation from './JobInformation';
import JobDetails from './JobDetails';
import QualificationQuestion from './QualificationQuestion';
import AddIntroVideo from './AddIntroVideo';
import CandidatesVideoAnswer from './CandidatesVideoAnswer';
import SelectWorkflow from './SelectWorkflow';
import PreviewJob from './PreviewJob';
import PublishJob from './ShareJob';

import { useNewJob } from '@/components';

import IconBackArrow from '@/assets/icons/arrow_down.svg';

const { Sider, Content } = Layout;

export default function CreateNewJobPage() {
  const router = useRouter();
  const { step, nextStep, subStep, nextSubStep, stepItems } = useNewJob();
  const query = useSearchParams();

  useEffect(() => {
    if (query.get('step') && query.get('substep')) {
      nextStep(parseInt(query.get('step') as string, 10));
      nextSubStep(parseInt(query.get('substep') as string, 10));
    }
  }, [query, nextStep, nextSubStep]);

  const handleBack = () => {
    router.back();
  };

  return (
    <Layout className="!flex-row !min-h-full">
      <Sider className="!bg-white" width={345} breakpoint="xl" collapsedWidth={0}>
        <div className="w-full h-full flex flex-col items-center justify-between pb-8 border-r border-r-[#EDEFF1]">
          <div className="py-8 pl-10 pr-6">
            <Button
              className="mb-7 !pl-0"
              type="link"
              icon={<IconBackArrow className="!rotate-[90deg]" />}
              onClick={handleBack}
            >
              <span className="text-sm text-[#294753] font-semibold">Back</span>
            </Button>
            <Steps current={step} direction="vertical" items={stepItems} />
          </div>
          <p className="text-[#8C8C8C]">© Dory {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </Sider>
      <Layout className="!min-h-full">
        <Row className="h-full">
          <Col span={step === 4 && subStep === 6 ? 16 : 24}>
            <Content className="relative h-full bg-white">
              {step === 0 && (
                <>
                  {subStep === 0 && <JobInformation />}
                  {subStep === 1 && <JobDetails />}
                </>
              )}

              {step === 1 && <>{subStep === 2 && <QualificationQuestion />}</>}

              {step === 2 && <>{subStep === 3 && <AddIntroVideo />}</>}

              {step === 2 && <>{subStep === 4 && <CandidatesVideoAnswer />}</>}

              {step === 3 && <>{subStep === 5 && <SelectWorkflow />}</>}

              {step === 4 && <>{subStep === 6 && <PreviewJob />}</>}

              {step === 5 && <>{subStep === 7 && <PublishJob />}</>}
            </Content>
          </Col>
          {step === 4 && subStep === 6 && (
            <Col span={8}>
              <Content className="h-full bg-[#F9FBFC] border-l border-l-[#EDEFF1]">
                <div className="text-center pt-10">
                  <DeviceFrameset device="iPhone X" zoom={0.85}>
                    <div className="text-base">Hello world</div>
                  </DeviceFrameset>
                </div>
              </Content>
            </Col>
          )}
        </Row>
      </Layout>
    </Layout>
  );
}

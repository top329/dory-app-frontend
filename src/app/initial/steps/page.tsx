'use client';

import { Layout, Steps } from 'antd';

import { useSignupInitial } from '@/components/providers/SignupInitialProvider';

import InitialStart from './InitialStart';
import DefaultLanguage from './DefaultLanguage';
import CompanyWeekDay from './CompanyWeekDay';
import CompanyCountry from './CompanyCountry';
import SelectTimeZone from './SelectTimeZone';
import CompanyWorkers from './CompanyWorkers';
import CompanyProfile from './CompanyProfile';
import SelectOption from './SelectOption';

const { Sider, Content } = Layout;

export default function InitialSettingStepPage() {
  const { step, stepItems } = useSignupInitial();

  return (
    <Layout className="!w-full !h-full !flex-row">
      <Sider className="!h-full !bg-[#F9FBFC] border-r border-r-[#EDEFF1]" width={400} breakpoint="xl" collapsedWidth={0}>
        <div className="w-full h-full flex flex-col items-center justify-between pb-8">
          <div className="pt-10 pb-7 pr-4 pl-10">
            <h3 className="text-2xl leading-[33px] font-semibold mb-10">Complete these steps</h3>
            <Steps current={step} direction="vertical" items={stepItems} />
          </div>
          <p className="text-[#8C8C8C]">© Dory {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </Sider>
      <Layout className="h-full">
        <Content className="relative w-full h-full bg-white">
          {step === -1 && <InitialStart />}

          {step === 0 && <DefaultLanguage />}

          {step === 1 && <CompanyWeekDay />}

          {step === 2 && <CompanyCountry />}

          {step === 3 && <SelectTimeZone />}

          {step === 4 && <CompanyWorkers />}

          {step === 5 && <CompanyProfile />}

          {step === 6 && <SelectOption />}

          <div className="w-full h-[65%] bg-[url('/decorartion.png')] bg-no-repeat bg-cover bg-top absolute top-0"></div>
        </Content>
      </Layout>
    </Layout>
  );
}

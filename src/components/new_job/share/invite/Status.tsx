import { Button, Card, Tag } from 'antd';

import IconFileSearch from '@/assets/icons/file-search.svg';
import { MoreOutlined } from '@ant-design/icons';

export default function Status() {
  return (
    <div className="w-full border border-[#EDEFF1] p-6 shadow-[#10182808]">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6">
          <IconFileSearch />
        </div>
        <p className="text-xl text-[#0E181C] font-medium mb-4">There are no available candidates</p>
        <p className="text-sm text-[#666666] leading-5 mb-6">
          Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries
        </p>
        <Button type="primary" className="!h-9 !bg-mainColor hover:!opacity-75 w-[168px]">
          Send other invitation
        </Button>
      </div>
      {/* <div className="flex items-center flex-wrap gap-4">
        <div className="flex items-center justify-between px-4 py-5 border border-[#EDEFF1] rounded-xl w-[49%]">
          <div className="flex items-start gap-2">
            <MoreOutlined className="pt-1" />
            <div>
              <p className="text-sm text-[#70848C] font-medium mb-1">Individual</p>
              <p className="text-base text-black font-semibold">Aliando Syarief</p>
              <p className="text-base text-[#70848C]">syarieff@example.com</p>
            </div>
          </div>
          <Tag color="#01755E">
            <span className="text-white">Applied</span>
          </Tag>
        </div>
      </div> */}
    </div>
  );
}

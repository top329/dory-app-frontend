import { Button, Progress } from 'antd';

import IconUpload from '@/assets/icons/upload_2.svg';
import { ClockCircleOutlined } from '@ant-design/icons';

export default function VideoUpload() {
  return (
    <div className="relative">
      <div className="w-full h-[65%] bg-[url('/convetti.png')] bg-no-repeat bg-cover bg-top absolute -z-[0] top-[-150px]"></div>
      <div className="flex flex-col items-center gap-8 mb-12">
        <IconUpload />
        <div>
          <h1 className="text-2xl font-medium mb-3">Uploading Your Responses</h1>
          <h3 className="text-sm text-[#777777]">Don’t go yet! Your responses are being uploaded.</h3>
        </div>
        <Progress success={{ percent: 30 }} size={['100%', 16]} showInfo={false} />
        <div className="flex items-center gap-2">
          <ClockCircleOutlined className="text-xl text-black" />
          <p className="text-base">Less than a minute left</p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <Button className="!w-full !h-11 !rounded-lg !bg-[#294753] hover:!opacity-90">
          <span className="text-base font-semibold text-white">Next step</span>
        </Button>
        <Button type="default" className="!w-full !h-11 !rounded-lg hover:!opacity-90 hover:!border-gray-300">
          <span className="text-base font-semibold text-[#344054]">Re take video</span>
        </Button>
      </div>
    </div>
  );
}

import { Button, Card, Image } from 'antd';

import IconCheckBoxDisable from '@/assets/icons/circle_checkbox_disable.svg';
import IconCheckBoxActive from '@/assets/icons/circle_checkbox_active.svg';
import IconDot from '@/assets/icons/dot.svg';

export default function VideoList() {
  return (
    <>
      <Card
        title={
          <div className="py-6">
            <h1 className="text-2xl font-medium">What do you use Dory for?</h1>
            <h3 className="text-sm text-[#000000]">Lorem ipsum is placeholder text commonly</h3>
          </div>
        }
        className="!mb-8"
      >
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-lg border boder-[#EDEFF1] cursor-pointer hover:border-[#294753]">
            <div className="flex items-center gap-2">
              <IconCheckBoxDisable />
              <div className="flex items-center gap-4">
                <Image width={105} preview={false} src="/snazzy-image.png" className="!rounded-lg" />
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-medium">recruitervideo1.mp4</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-[#4D6670]">02.00</p>
                    <IconDot />
                    <p className="text-sm text-[#4D6670]">45mb</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div className="flex flex-col gap-6">
        <Button className="!w-full !h-11 !rounded-lg !bg-[#294753] hover:!opacity-90">
          <span className="text-base font-semibold text-white">Continue</span>
        </Button>
        <Button type="default" className="!w-full !h-11 !rounded-lg hover:!opacity-90 hover:!border-gray-300">
          <span className="text-base font-semibold text-[#344054]">Re take video</span>
        </Button>
      </div>
    </>
  );
}

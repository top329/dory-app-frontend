import Image, { StaticImageData } from 'next/image';
import { Button } from 'antd';

import { GlobalOutlined } from '@ant-design/icons';
import { title } from 'process';

interface RightComponentProps {
  imgData: StaticImageData;
  title?: string;
}

export default function RightComponent({ imgData, title }: RightComponentProps) {
  return (
    <>
      <div className="px-7 absolute z-10 bottom-[40px]">
        <h1
          className="text-[30px] leading-[40px] xl:text-[56px] xl:leading-[70px] 
          sm:text-[40px] sm:leading-[55px] text-white font-semibold mb-8 break-normal"
        >
          {title}
        </h1>
        <div className="flex flex-col items-center justify-center xl:flex-row xl:justify-between">
          <Button
            type="default"
            className="!text-white !bg-[#5050504D] hover:!border-white hover:!text-white 
              active:!border-white active:!text-white !h-[44px] !text-base !font-semibold !w-full 
               !mb-4 xl:!mb-0 xl:!w-auto"
            icon={<GlobalOutlined />}
          >
            Social Media
          </Button>
          <Button
            type="default"
            className="!text-white !bg-[#5050504D] hover:!border-white hover:!text-white 
              active:!border-white active:!text-white !h-[44px] !text-base !font-semibold !w-full 
               !mb-4 xl:!mb-0 xl:!w-auto"
            icon={<GlobalOutlined />}
          >
            Social Media
          </Button>
          <Button
            type="default"
            className="!text-white !bg-[#5050504D] hover:!border-white hover:!text-white 
              active:!border-white active:!text-white !h-[44px] !text-base !font-semibold !w-full 
               !mb-4 xl:!mb-0 xl:!w-auto"
            icon={<GlobalOutlined />}
          >
            Social Media
          </Button>
        </div>
      </div>
      <Image className="w-full h-full object-cover rounded-3xl" alt="" src={imgData} priority={true} />
    </>
  );
}

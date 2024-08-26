'use client';

import { Upload, type UploadProps } from 'antd';

import IconUpload from '@/assets/icons/upload_3.svg';

const { Dragger } = Upload;

export default function DialogUploadPortfolio() {
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: () => {
      return false;
    },
  };

  return (
    <>
      <h3 className="text-base font-medium leading-6 mb-3">Do you have a portfolio that you can show recruiters?</h3>
      <div className="pr-3 py-2">
        <Dragger {...props} className="group !bg-white" disabled>
          <div className="flex items-center justify-center">
            <IconUpload />
          </div>
          <p className="text-sm text-[#1A1A1A]">
            <span className="text-[#0071CB] font-semibold">Click to upload</span>&nbsp;
            <span>or drag and drop</span>
            <br />
            <span>SVG, PNG, JPG or GIF (max. 800x400px)</span>
          </p>
        </Dragger>
      </div>
    </>
  );
}

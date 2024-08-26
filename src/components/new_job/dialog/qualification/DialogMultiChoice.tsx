'use client';

import { Checkbox } from 'antd';

export default function DialogMultiChoice() {
  return (
    <>
      <h3 className="text-base font-medium leading-6 mb-3">Which of the following software tools do you primarily use for UI design?</h3>
      <div className="px-3 py-2">
        <div className="mb-[10px]">
          <Checkbox disabled>
            <p className="text-base text-[#667085]">Lorem ipsum dolor sit amet</p>
          </Checkbox>
        </div>
        <div className="mb-[10px]">
          <Checkbox disabled>
            <p className="text-base text-[#667085]">Lorem ipsum dolor sit amet</p>
          </Checkbox>
        </div>
        <div className="mb-[10px]">
          <Checkbox disabled>
            <p className="text-base text-[#667085]">Lorem ipsum dolor sit amet</p>
          </Checkbox>
        </div>
      </div>
    </>
  );
}

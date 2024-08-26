import { Radio } from 'antd';

export default function DialogScaleAnswer() {
  return (
    <>
      <h3 className="text-base font-medium leading-6 mb-3">Which of the following software tools do you primarily use for UI design?</h3>
      <div className="pr-3 py-2">
        <Radio.Group>
          <Radio className="flex-col" value={1} disabled>
            <span className="text-base text-[#294753]">Very Disagree</span>
          </Radio>
          <Radio className="flex-col" value={2} disabled>
            <span className="text-base text-[#294753]">Disagree</span>
          </Radio>
          <Radio className="flex-col" value={3} disabled>
            <span className="text-base text-[#294753]">Neutral</span>
          </Radio>
          <Radio className="flex-col" value={4} disabled>
            <span className="text-base text-[#294753]">Agree</span>
          </Radio>
          <Radio className="flex-col" value={5} disabled>
            <span className="text-base text-[#294753]">Very Agree</span>
          </Radio>
        </Radio.Group>
      </div>
    </>
  );
}

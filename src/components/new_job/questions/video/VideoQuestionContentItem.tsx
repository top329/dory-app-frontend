import { Card, FormInstance } from 'antd';

import { useNewJob } from '@/components';

import { type VideoQuestionAddContentType } from '@/types/new_job';

import IconEdit from '@/assets/icons/edit.svg';
import IconDelete from '@/assets/icons/delete.svg';
import IconLight from '@/assets/icons/light.svg';
import IconVideo from '@/assets/icons/video.svg';
import IconRepeat from '@/assets/icons/repeat.svg';

export default function VideoQuestionContentItem({
  index,
  item,
  form,
}: {
  index: number;
  item: VideoQuestionAddContentType;
  form: FormInstance<any>;
}) {
  const { addVideoQuestionContent, videoQuestionContent, selectVideoQuestModule } = useNewJob();

  const handleEditContent = () => {
    selectVideoQuestModule({
      ...item,
      show: true,
    });
  };

  const handleDeleteContent = () => {
    const arrData = [...videoQuestionContent];
    arrData.splice(index, 1);

    const filter = arrData?.map((rs: VideoQuestionAddContentType, key: number) => {
      return {
        ...rs,
        id: key,
      };
    });

    if (filter.length !== 0) {
      form.setFields([{ name: 'videoQuestionContent', errors: undefined, value: '' }]);
    } else {
      form.setFields([{ name: 'videoQuestionContent', errors: ['This is a required'], value: '' }]);
    }

    addVideoQuestionContent(filter);
  };

  return (
    <Card bodyStyle={{ padding: '20px' }}>
      <div className="w-full bg-[#E4E7E9] px-5 py-[9px] mb-4 flex items-center justify-between">
        <p className="text-sm text-black font-semibold">Question {index + 1}</p>
        <div className="flex items-center gap-2">
          <div className="cursor-pointer" onClick={handleEditContent}>
            <IconEdit />
          </div>
          <div className="cursor-pointer" onClick={handleDeleteContent}>
            <IconDelete />
          </div>
        </div>
      </div>
      <p className="text-base text-black font-medium w-full whitespace-nowrap overflow-hidden text-ellipsis border-b border-[#EDEFF1] leading-[30px] mb-2">
        {item?.title}
      </p>
      <p className="text-base text-[#00000099] leading-[30px] border-b border-[#EDEFF1] mb-2">
        Answer Type: <span className="text-black font-medium">Video answer</span>
      </p>
      <div className="flex items-center gap-9">
        <div className="flex items-center gap-[10px]">
          <IconLight />
          <p className="text-base text-black font-medium">{item?.thinkingTime}</p>
        </div>
        <div className="flex items-center gap-[10px]">
          <IconVideo />
          <p className="text-base text-black font-medium">{item?.answerTime}</p>
        </div>
        <div className="flex items-center gap-[10px]">
          <IconRepeat />
          <p className="text-base text-black font-medium">{item?.totalTakes}x Takes</p>
        </div>
      </div>
    </Card>
  );
}

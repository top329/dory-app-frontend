'use client';

import { Button } from 'antd';
import { useNewJob } from '@/components';

import DialogMultiChoice from './DialogMultiChoice';
import DialogPreAnswer from './DialogPreAnswer';
import DialogTextBox from './DialogTextBox';
import DialogScaleAnswer from './DialogScaleAnswer';
import DialogUploadPortfolio from './DialogUploadPortfolio';

import { QuestionKindEnum } from '@/types/new_job';

export default function DialogContent() {
  const { questModule, setModal, selectQuestModule } = useNewJob();

  const handleInsert = () => {
    if (questModule.kind !== QuestionKindEnum.empty) setModal(false);

    selectQuestModule({
      kind: questModule.kind,
      show: true,
      title: questModule.title,
      icon: questModule.icon,
    });
  };

  return (
    <>
      <div className="px-9 pt-9 w-full h-full relative">
        <div className="py-[2px] px-2 rounded-md bg-gray-100 text-xs text-[#0E181C] font-medium inline-block mb-4">Example</div>

        {questModule.kind === QuestionKindEnum.pre_answer && <DialogPreAnswer />}

        {questModule.kind === QuestionKindEnum.multi_choice && <DialogMultiChoice />}

        {questModule.kind === QuestionKindEnum.text_box && <DialogTextBox />}

        {questModule.kind === QuestionKindEnum.scale_answer && <DialogScaleAnswer />}

        {questModule.kind === QuestionKindEnum.upload_portfolio && <DialogUploadPortfolio />}

        <div className="absolute bottom-0 left-0 right-0 h-[60px] border-t border-t-[#EDEFF1] flex items-center justify-end">
          <Button type="primary" className="!h-9 !rounded-lg !bg-mainColor hover:!opacity-75 mr-9" onClick={handleInsert}>
            <span className="text-sm font-semibold">Insert</span>
          </Button>
        </div>
      </div>
    </>
  );
}

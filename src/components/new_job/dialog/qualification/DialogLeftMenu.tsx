'use client';

import { useNewJob } from '@/components';

import { QuestionKindEnum, QuestionTitleEnum } from '@/types/new_job';

import IconQuestion from '@/assets/icons/question.svg';
import IconCheck from '@/assets/icons/check_broken.svg';
import IconTextBox from '@/assets/icons/align-left.svg';
import IconCircle from '@/assets/icons/circle.svg';
import IconUpload from '@/assets/icons/upload-cloud.svg';

export default function DialogLeftMenu() {
  const { selectQuestModule, questModule } = useNewJob();

  return (
    <div className="w-full py-8 bg-[#F9FBFC] rounded-bl-xl">
      <div
        className={`px-6 py-[10px] ${questModule.kind === QuestionKindEnum.pre_answer && 'bg-[#E4E7E966]'} cursor-pointer flex items-center gap-4`}
        onClick={() => selectQuestModule({ kind: QuestionKindEnum.pre_answer, title: QuestionTitleEnum.pre_answer, icon: <IconQuestion /> })}
      >
        <div className="w-9 h-9 rounded-full border border-[#EDEFF1] flex items-center justify-center">
          <IconQuestion />
        </div>
        <div>
          <p className="text-base font-semibold">Pre-defined answer</p>
          <p className="text-sm text-[#475467]">Lorem ipsum is placeholder text </p>
        </div>
      </div>
      <div
        className={`px-6 py-[10px] ${questModule.kind === QuestionKindEnum.multi_choice && 'bg-[#E4E7E966]'} cursor-pointer flex items-center gap-4`}
        onClick={() => selectQuestModule({ kind: QuestionKindEnum.multi_choice, title: QuestionTitleEnum.multi_choice, icon: <IconCheck /> })}
      >
        <div className="w-9 h-9 rounded-full border border-[#EDEFF1] flex items-center justify-center">
          <IconCheck />
        </div>
        <div>
          <p className="text-base font-semibold">Multiple choice</p>
          <p className="text-sm text-[#475467]">Lorem ipsum is placeholder text </p>
        </div>
      </div>
      <div
        className={`px-6 py-[10px] ${questModule.kind === QuestionKindEnum.text_box && 'bg-[#E4E7E966]'} cursor-pointer flex items-center gap-4`}
        onClick={() => selectQuestModule({ kind: QuestionKindEnum.text_box, title: QuestionTitleEnum.text_box, icon: <IconTextBox /> })}
      >
        <div className="w-9 h-9 rounded-full border border-[#EDEFF1] flex items-center justify-center">
          <IconTextBox />
        </div>
        <div>
          <p className="text-base font-semibold">Text box</p>
          <p className="text-sm text-[#475467]">Lorem ipsum is placeholder text </p>
        </div>
      </div>
      <div
        className={`px-6 py-[10px] ${questModule.kind === QuestionKindEnum.scale_answer && 'bg-[#E4E7E966]'} cursor-pointer flex items-center gap-4`}
        onClick={() => selectQuestModule({ kind: QuestionKindEnum.scale_answer, title: QuestionTitleEnum.scale_answer, icon: <IconCircle /> })}
      >
        <div className="w-9 h-9 rounded-full border border-[#EDEFF1] flex items-center justify-center">
          <IconCircle />
        </div>
        <div>
          <p className="text-base font-semibold">Scale answer</p>
          <p className="text-sm text-[#475467]">Lorem ipsum is placeholder text </p>
        </div>
      </div>
      <div
        className={`px-6 py-[10px] ${
          questModule.kind === QuestionKindEnum.upload_portfolio && 'bg-[#E4E7E966]'
        } cursor-pointer flex items-center gap-4`}
        onClick={() =>
          selectQuestModule({ kind: QuestionKindEnum.upload_portfolio, title: QuestionTitleEnum.upload_portfolio, icon: <IconUpload /> })
        }
      >
        <div className="w-9 h-9 rounded-full border border-[#EDEFF1] flex items-center justify-center">
          <IconUpload />
        </div>
        <div>
          <p className="text-base font-semibold">Upload CV/portfolio</p>
          <p className="text-sm text-[#475467]">Lorem ipsum is placeholder text </p>
        </div>
      </div>
    </div>
  );
}

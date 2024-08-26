import { Col, FormInstance, Row } from 'antd';

import { useNewJob } from '@/components';

import { type QuestionAddContentType } from '@/types/new_job';

import IconEdit from '@/assets/icons/edit.svg';
import IconDelete from '@/assets/icons/delete.svg';

export default function NewJobQuestionContentItem({ index, item, form }: { index: number; item: QuestionAddContentType; form: FormInstance<any> }) {
  const { addAnswerContent, selectQuestModule, answerContent } = useNewJob();

  const handleEditContent = () => {
    selectQuestModule({
      ...item,
      show: true,
    });
  };

  const handleDeleteContent = () => {
    answerContent.splice(index, 1);

    const filter = answerContent?.map((rs: QuestionAddContentType, key: number) => {
      return {
        ...rs,
        id: key,
      };
    });

    if (filter.length !== 0) {
      form.setFields([{ name: 'answerContent', errors: undefined, value: '' }]);
    } else {
      form.setFields([{ name: 'answerContent', errors: ['This is a required'], value: '' }]);
    }

    addAnswerContent(filter);
  };

  return (
    <div className="w-full border border-[#EDEFF1] rounded-lg bg-white h-12 px-6">
      <Row className="h-full">
        <Col span={21}>
          <div className="flex items-center gap-3 w-full h-full">
            <div className="pt-1">{item.icon}</div>
            <p className="text-base text-[#101828] w-full whitespace-nowrap overflow-hidden text-ellipsis">{item.question}</p>
          </div>
        </Col>
        <Col span={3}>
          <div className="flex items-center justify-end gap-3 w-full h-full">
            <div className="cursor-pointer" onClick={handleEditContent}>
              <IconEdit />
            </div>
            <div className="cursor-pointer" onClick={handleDeleteContent}>
              <IconDelete />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

import { FormInstance } from 'antd';
import { NewJobQuestionContentItem, QuestionAddContent, useNewJob } from '@/components';
import type { QuestionAddContentType } from '@/types/new_job';

export default function NewJobQuestionContent({ form }: { form: FormInstance<any> }) {
  const { questModule, answerContent } = useNewJob();

  return (
    <>
      {answerContent?.map((rs: QuestionAddContentType, key: number) => (
        <div key={key} className="mb-4">
          {questModule?.show && questModule?.id === key && questModule?.question ? (
            <>
              <QuestionAddContent form={form} />
            </>
          ) : (
            <NewJobQuestionContentItem index={key} item={rs} form={form} />
          )}
        </div>
      ))}

      {questModule?.show && !questModule?.question && <QuestionAddContent form={form} />}
    </>
  );
}

import { FormInstance } from 'antd';

import { VideoQuestionAddContent, VideoQuestionContentItem, useNewJob } from '@/components';
import { type VideoQuestionAddContentType } from '@/types/new_job';

export default function VideoQuestionContent({ form }: { form: FormInstance<any> }) {
  const { videoQuestModule, videoQuestionContent } = useNewJob();

  return (
    <>
      {videoQuestionContent?.map((rs: VideoQuestionAddContentType, key: number) => (
        <div key={key} className="mb-4">
          {videoQuestModule?.show && videoQuestModule?.id === key && videoQuestModule?.title ? (
            <>
              <VideoQuestionAddContent form={form} />
            </>
          ) : (
            <VideoQuestionContentItem index={key} item={rs} form={form} />
          )}
        </div>
      ))}

      {videoQuestModule.show && !videoQuestModule?.title && <VideoQuestionAddContent form={form} />}
    </>
  );
}

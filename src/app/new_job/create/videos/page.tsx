'use client';

import { useSearchParams } from 'next/navigation';
import { VideoCheck, VideoDescription, useNewJob } from '@/components';

export default function VideosPage() {
  const { videoStep } = useNewJob();
  const query = useSearchParams();
  const step = query.get('step');

  return (
    <>
      {step ? (
        <>{videoStep === 1 && <VideoDescription />}</>
      ) : (
        <>
          {videoStep === 1 && <VideoCheck />}
          {videoStep === 2 && <VideoDescription />}
        </>
      )}
    </>
  );
}

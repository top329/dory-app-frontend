'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from 'antd';

import { useNewJob } from '@/components';
import { blobToFile, useInterval } from '@/utils';

export default function VideoContent() {
  const { videoStep, selectRecordVideoFile, jobs } = useNewJob();
  const query = useSearchParams();
  const step = query.get('step');

  const refCamera = useRef<HTMLVideoElement | null>(null);
  const refVideo = useRef<HTMLVideoElement | null>(null);

  const [intervalDelay, setIntervalDelay] = useState<number>(-1);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [statusRecord, setStatusRecord] = useState<string>('Start');
  const [showTime, setShowTime] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedMediaUrl, setRecordedMediaUrl] = useState<string>('');
  const [showVideoKind, setShowVideoKind] = useState<string>('record');

  useInterval(() => {
    handleRecordTime();
  }, intervalDelay);

  useEffect(() => {
    (async () => {
      if (!step) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

          if (stream?.active) {
            setMediaStream(stream);
            refCamera!.current!.srcObject = stream;

            refCamera!.current!.onloadedmetadata = () => {
              refCamera?.current?.play();
            };
          }
        } catch (error) {}
      } else if (jobs?.videoQuestionFile) {
        refCamera!.current!.src = URL.createObjectURL(jobs?.videoQuestionFile as File);
        selectRecordVideoFile(jobs?.videoQuestionFile as File);
      }
    })();
  }, [videoStep]);

  const handleRecordTime = () => {
    setSecond(prev => prev + 1);

    if (second === 59) {
      setMinute(prev => prev + 1);
      setSecond(0);
    }
  };

  const handleRecordVideo = () => {
    if (statusRecord === 'Start') {
      setMinute(0);
      setSecond(0);
      setShowTime(true);
      setStatusRecord('Stop');
      setIntervalDelay(1000);

      setRecordVideo();
      setShowVideoKind('record');
      refVideo!.current!.src = '';
      refCamera?.current?.play();
      selectRecordVideoFile(null);
    } else {
      setStatusRecord('Start');
      setIntervalDelay(-1);

      if (mediaRecorder) {
        mediaRecorder?.stop();
        setMediaRecorder(null);
      }
    }
  };

  const handleRetakeVideo = () => {
    setShowTime(false);
    if (refVideo?.current?.src && refVideo?.current?.src !== '') refVideo?.current?.play();
  };

  const setRecordVideo = () => {
    const mediaData: Blob[] = [];
    const recorder = new MediaRecorder(mediaStream as MediaStream);

    recorder!.ondataavailable = (e: BlobEvent) => {
      if (e?.data && e?.data?.size !== 0) mediaData.push(e?.data);
    };

    recorder.onstop = () => {
      setShowVideoKind('retake');
      if (recordedMediaUrl && recordedMediaUrl !== '') URL.revokeObjectURL(recordedMediaUrl);

      const blob = new Blob(mediaData, { type: 'video/mp4' });
      refVideo!.current!.src = URL.createObjectURL(blob);
      setRecordedMediaUrl(URL.createObjectURL(blob));
      refCamera?.current?.pause();
      selectRecordVideoFile(blobToFile(blob, 'sample.mp4'));
    };

    setMediaRecorder(recorder);
    recorder.start();
  };

  return (
    <div className="relative flex flex-col  items-center justify-center">
      <video
        ref={refCamera}
        className={`object-cover rounded-3xl w-full h-full mb-5 ${showVideoKind === 'record' ? 'display' : 'hidden'}`}
        {...(step ? { controls: true } : {})}
      ></video>
      <video
        ref={refVideo}
        className={`object-cover rounded-3xl w-full h-full mb-5 ${showVideoKind === 'retake' ? 'display' : 'hidden'}`}
        controls
      ></video>

      {!step && (
        <div className="flex items-center justify-center gap-4">
          <Button className="!bg-[#D0D5DD] hover:!opacity-75 !w-[180px] !h-11 !rounded-lg" type="primary" onClick={handleRecordVideo}>
            <span className="text-base text-[#0E181C] font-semibold">{statusRecord} Recording</span>
          </Button>
          <Button
            className={`${statusRecord === 'Stop' ? '!bg-[#0000000a]' : '!bg-[#D0D5DD]'} hover:!opacity-75 !w-[180px] !h-11 !rounded-lg`}
            type="primary"
            onClick={handleRetakeVideo}
            disabled={statusRecord === 'Stop'}
          >
            <span className={`text-base font-semibold ${statusRecord === 'Stop' ? '!text-[#00000040]' : 'text-[#0E181C]'}`}>Retake Video</span>
          </Button>
        </div>
      )}

      {showTime && (
        <div className="absolute w-[90px] h-8 rounded-[40px] bg-white z-10 top-4 flex items-center justify-center gap-2">
          <div className={`w-3 h-3 rounded-full ${statusRecord === 'Stop' ? 'bg-[#F04545]' : 'bg-[#EAEBF6]'}`}></div>
          <p className="text-sm text-black font-semibold">
            {minute.toString().padStart(2, '0')}:{second.toString().padStart(2, '0')}
          </p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Button, Skeleton } from 'antd';

import { useNewJob } from '@/components';
import { useNavigatorOnline } from '@/utils';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import IconSuccess from '@/assets/icons/check_success.svg';
import IconFail from '@/assets/icons/check_fail.svg';

export default function VideoCheck() {
  const { nextVideoStep } = useNewJob();
  const isOnline = useNavigatorOnline();

  const [audioStatus, setAudioStatus] = useState<number>(0);
  const [videoStatus, setVideoStatus] = useState<number>(0);
  const [networkStatus, setNetworkStatus] = useState<number>(0);
  const [audioError, setAudioError] = useState<string>('');
  const [videoError, setVideoError] = useState<string>('');
  const [networkError, setNetworkError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        if (audioStream?.active) {
          setAudioStatus(1);
          setAudioError('Looks good');
        } else {
          setAudioStatus(2);
          setError(true);
        }
      } catch (error: any) {
        setAudioError(error?.toString().split(':')[1].trim());
        setAudioStatus(2);
        setError(true);
      }

      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoStream?.active) {
          setVideoStatus(1);
          setVideoError('Looks good');
        } else {
          setVideoStatus(2);
          setError(true);
        }
      } catch (error: any) {
        setVideoStatus(2);
        setVideoError(error?.toString().split(':')[1].trim());
        setError(true);
      }

      if (isOnline) {
        setNetworkStatus(1);
        setNetworkError('Looks good');
      } else {
        setNetworkStatus(2);
        setNetworkError('Internet disconnected');
        setError(true);
      }

      setLoading(false);
    })();
  }, []);

  return (
    <>
      <h1 className="text-[32px] font-medium leading-9 mb-6">Get ready, you are about to record a welcome video 👋</h1>
      <h3 className="text-2xl font-medium mb-6">Check your set up</h3>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Skeleton loading={loading} active avatar paragraph={{ rows: 1 }} />

            {!loading && (
              <>
                <div
                  className={`w-10 h-10 rounded-full ${
                    videoStatus === 0 ? 'bg-[#0000000f]' : videoStatus === 1 ? 'bg-[#78BA44]' : 'bg-[#ff4d4f]'
                  } flex items-center justify-center`}
                >
                  {videoStatus === 1 && <IconSuccess className="!text-white" />}
                  {videoStatus === 2 && <IconFail className="!text-white" />}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium">Built-in camera</p>
                  <p className="text-sm text-[#404040]">{videoError}</p>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Skeleton loading={loading} active avatar paragraph={{ rows: 1 }} />

            {!loading && (
              <>
                <div
                  className={`w-10 h-10 rounded-full ${
                    audioStatus === 0 ? 'bg-[#0000000f]' : audioStatus === 1 ? 'bg-[#78BA44]' : 'bg-[#ff4d4f]'
                  } flex items-center justify-center`}
                >
                  {audioStatus === 1 && <IconSuccess className="!text-white" />}
                  {audioStatus === 2 && <IconFail className="!text-white" />}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium">Built-in microphone</p>
                  <p className="text-sm text-[#404040]">{audioError}</p>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Skeleton loading={loading} active avatar paragraph={{ rows: 1 }} />

            {!loading && (
              <>
                <div
                  className={`w-10 h-10 rounded-full ${
                    networkStatus === 0 ? 'bg-[#0000000f]' : networkStatus === 1 ? 'bg-[#78BA44]' : 'bg-[#ff4d4f]'
                  } flex items-center justify-center`}
                >
                  {networkStatus === 1 && <IconSuccess className="!text-white" />}
                  {networkStatus === 2 && <IconFail className="!text-white" />}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium">Internet connection</p>
                  <p className="text-sm text-[#404040]">{networkError}</p>
                </div>
              </>
            )}
          </div>
        </div>
        <Button
          className={`!w-full !h-11 !rounded-lg ${error ? '!bg-[#AAD7FB]' : '!bg-mainColor'} hover:!opacity-75`}
          disabled={error}
          onClick={() => nextVideoStep()}
        >
          <span className="text-base font-semibold text-white">Let’s Start</span>
        </Button>
      </div>
    </>
  );
}

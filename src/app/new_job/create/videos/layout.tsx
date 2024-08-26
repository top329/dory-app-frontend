'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Col, Layout, Row } from 'antd';
import { VideoContent, useNewJob } from '@/components';

import IconBackArrow from '@/assets/icons/arrow_down.svg';

const { Content } = Layout;

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { videoStep, prevVideoStep, jobs } = useNewJob();
  const query = useSearchParams();
  const step = query.get('step');

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    setWidth(windowWidth);
  }, [width, setWidth]);

  return (
    <Layout className="!flex-row h-full w-full !bg-white">
      <Row className="w-full h-full">
        <Col span={9}>
          <Content className="h-full">
            <div className="p-16 w-full h-full flex flex-col justify-center">
              <Button
                className="mb-10 !pl-0 !w-[63px]"
                type="link"
                icon={<IconBackArrow className="!rotate-[90deg]" />}
                onClick={() => {
                  if (videoStep === 1 || step) {
                    router.back();
                  } else {
                    prevVideoStep();
                  }
                }}
              >
                <span className="text-sm text-[#294753] font-semibold">Back</span>
              </Button>
              <div>{children}</div>
            </div>
          </Content>
        </Col>
        <Col span={15} className="h-full">
          <Content className="p-10 h-full flex items-center justify-center relative">
            <div className="w-full h-full">
              <Image
                className="object-cover rounded-3xl w-full h-full"
                width={0}
                height={0}
                sizes="100vw"
                alt=""
                src="/video_bg.png"
                priority={true}
              />
            </div>
            <div className="absolute w-[80%]">
              {step ? (
                <>
                  {videoStep === 1 && (
                    <>
                      {jobs?.videoQuestionFile ? (
                        <>
                          <VideoContent />
                        </>
                      ) : (
                        <>
                          <Image
                            className="object-cover rounded-3xl w-full h-full"
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt=""
                            src="/snazzy-image.png"
                            priority={true}
                          />
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {videoStep === 1 && (
                    <Image
                      className="object-cover rounded-3xl w-full h-full"
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt=""
                      src="/snazzy-image.png"
                      priority={true}
                    />
                  )}

                  {videoStep === 2 && <VideoContent />}
                </>
              )}
            </div>
          </Content>
        </Col>
      </Row>
    </Layout>
  );
}

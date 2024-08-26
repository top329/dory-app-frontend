'use client';

import { useEffect, useState, MutableRefObject } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Drawer, FormInstance, FormListFieldData, Segmented } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import { DirectLinkQrCode, InviteCandidates } from '@/components';
import SignaturePad from 'react-signature-canvas';

import IconPublish from '@/assets/icons/publish_readme.svg';

export type InviteCandidatesProps = {
  form?: FormInstance<any>;
  field?: FormListFieldData;
  remove?: (index: number | number[]) => void;
  totalCnt?: number;
  index?: number;
  fieldName?: string;
  candidateKind?: string;
  setCandidateKind?: React.Dispatch<React.SetStateAction<string>>;
  tabTxt?: string;
  signRef?: MutableRefObject<SignaturePad | null>;
  shareOpen?: boolean;
  setShareOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  shareJobKind?: string;
  individualKind?: string;
  setIndividualKind?: React.Dispatch<React.SetStateAction<string>>;
  activeTab?: string;
  setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
  errorCountry?: boolean;
  setErrorCountry?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ShareJob() {
  const router = useRouter();
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [shareJobKind, setShareJobKind] = useState<string>('Direct Link & QR Code');

  useEffect(() => {
    setShareJobKind('Direct Link & QR Code');
  }, [shareOpen]);

  const handleChangeShare = (value: SegmentedValue) => {
    setShareJobKind(value.toString());
  };

  return (
    <>
      <Drawer
        placement="right"
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        closable={false}
        width={950}
        bodyStyle={{ padding: '32px 60px' }}
      >
        <div className="w-full">
          <h1 className="text-2xl text-black font-medium text-center mb-6">Share a job</h1>
          <div className="w-full text-center mb-6">
            <Segmented
              className="!rounded-full !bg-[#EDECEA] !border !boder-[#EDEFF1] !h-[42px] !p-1"
              value={shareJobKind}
              options={[
                {
                  label: (
                    <div className="h-[34px] w-[225px] flex items-center justify-center">
                      <p className="font-bold">Direct Link & QR Code</p>
                    </div>
                  ),
                  value: 'Direct Link & QR Code',
                },
                {
                  label: (
                    <div className="h-[34px] w-[225px] flex items-center justify-center">
                      <p className="font-bold">Invite Candidate</p>
                    </div>
                  ),
                  value: 'Invite Candidates',
                },
              ]}
              onChange={handleChangeShare}
            />
          </div>
          <Card>
            {shareJobKind === 'Direct Link & QR Code' && (
              <DirectLinkQrCode shareOpen={shareOpen} setShareOpen={setShareOpen} shareJobKind={shareJobKind} />
            )}

            {shareJobKind === 'Invite Candidates' && (
              <InviteCandidates shareOpen={shareOpen} setShareOpen={setShareOpen} shareJobKind={shareJobKind} />
            )}
          </Card>
        </div>
      </Drawer>
      <div className="relative w-full h-full bg-white">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center z-10 mt-[-350px]">
            <div className="mb-8">
              <IconPublish />
            </div>
            <h1 className="text-[32px] font-medium leading-[45px] mb-4 text-center">
              Your work has been successfully
              <br />
              published, it's time for you to
              <br />
              share this work
            </h1>
            <p className="text-[#666666] mb-8">Lorem ipsum is placeholder text commonly used in the</p>
            <Button
              type="primary"
              className="!h-10 !bg-mainColor hover:!opacity-75 !text-base !font-semibold !mb-4 w-[480px]"
              onClick={() => setShareOpen(true)}
            >
              Share Job Now
            </Button>
            <Button
              type="default"
              className="!h-10 hover:!opacity-75 !text-base !text-[#344054] !font-semibold w-[480px] !border-[#D0D5DD]"
              onClick={() => router.replace('/jobs')}
            >
              Skip for now
            </Button>
          </div>
        </div>
        <div className="w-full h-[65%] bg-[url('/decorartion.png')] bg-no-repeat bg-cover bg-top absolute top-0"></div>
      </div>
    </>
  );
}

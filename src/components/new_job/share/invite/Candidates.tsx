'use client';

import { useEffect } from 'react';
import { Segmented } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';

import InviteContent from './InviteContent';

import type { InviteCandidatesProps } from '@/app/new_job/create/ShareJob';

export default function Candidates({
  form,
  tabTxt,
  signRef,
  candidateKind,
  setCandidateKind,
  individualKind,
  setIndividualKind,
  activeTab,
  setActiveTab,
  errorCountry,
  setErrorCountry,
}: InviteCandidatesProps) {
  useEffect(() => {
    if (setCandidateKind) setCandidateKind('Individual');
  }, [tabTxt]);

  const handleChangeCandidate = (value: SegmentedValue) => {
    form?.resetFields();

    if (setErrorCountry) setErrorCountry(false);
    if (setCandidateKind) setCandidateKind(value.toString());
  };

  return (
    <>
      <div className="w-full mb-6">
        <Segmented
          className="!rounded-full !bg-[#EDECEA] !h-[37px] !p-1 !border !boder-[#EDEFF1]"
          value={candidateKind}
          options={[
            {
              label: (
                <div className="h-[29px] w-[150px] flex items-center justify-center">
                  <p className="text-base font-medium">Individual</p>
                </div>
              ),
              value: 'Individual',
            },
            {
              label: (
                <div className="h-[29px] w-[150px] flex items-center justify-center">
                  <p className="text-base font-medium">Bulk Upload</p>
                </div>
              ),
              value: 'Bulk Upload',
            },
            {
              label: (
                <div className="h-[29px] w-[150px] flex items-center justify-center">
                  <p className="text-base font-medium">Direct Link</p>
                </div>
              ),
              value: 'Direct Link',
            },
          ]}
          onChange={handleChangeCandidate}
        />
      </div>

      <InviteContent
        form={form}
        candidateKind={candidateKind}
        tabTxt={tabTxt}
        signRef={signRef}
        individualKind={individualKind}
        setIndividualKind={setIndividualKind}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        errorCountry={errorCountry}
        setErrorCountry={setErrorCountry}
      />
    </>
  );
}

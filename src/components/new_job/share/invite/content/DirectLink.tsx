'use client';

import { useState } from 'react';
import { Card, Tooltip } from 'antd';

import type { InviteCandidatesProps } from '@/app/new_job/create/ShareJob';

import IconCopy from '@/assets/icons/copy.svg';

export default function DirectLink({ form }: InviteCandidatesProps) {
  const publishUrl = typeof window !== 'undefined' && window.localStorage.getItem('publishUrl');

  const handleClipboard = async () => {
    await window.navigator.clipboard.writeText(publishUrl as string);
  };

  return (
    <Card>
      <p className="text-base text-[#0E181C] leading-6 mb-6">
        This is the Direct Link for the video interview you have created, meaning that if you navigate to this URL, you will see the introductory page
        to begin the video interview.
      </p>
      <p className="text-base text-[#294753] leading-6 mb-4 italic">
        You can send it out via email to invite individual candidates to submit (or re-submit) their video interview, or it can be saved as part of an
        email template in your ATS/CRM to bulk invite candidates. Please note we cannot track the Invite Status for candidates that have been invited
        in this way.
      </p>
      <div className="flex items-center justify-between">
        <div className="w-[90%] border border-gray-300 h-11 rounded-tl-lg rounded-bl-lg bg-gray-50 px-[14px] py-[10px]">
          <p className="text-base text-[#667085]">{publishUrl as string}</p>
        </div>
        <Tooltip title="Copied!" trigger="click" placement="top">
          <div
            className="w-[10%] h-11 border border-gray-300 rounded-tr-lg rounded-br-lg border-l-0 cursor-pointer flex items-center justify-center gap-2"
            onClick={handleClipboard}
          >
            <IconCopy />
            <p className="text-base text-[#294753] font-semibold">Copy</p>
          </div>
        </Tooltip>
      </div>
    </Card>
  );
}

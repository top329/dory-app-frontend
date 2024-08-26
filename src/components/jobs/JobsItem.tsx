'use client';

import { useRouter } from 'next/navigation';
import { Button, Divider, Dropdown, MenuProps, Space } from 'antd';

import { useAuth } from '..';
import { useSetJobFollowMutation } from '@/features/projects';
import { JobListType } from '@/types/jobs';

import { EditOutlined, MoreOutlined } from '@ant-design/icons';
import IconExternalLink from '@/assets/icons/link-external.svg';
import IconCopy from '@/assets/icons/copy_1.svg';
import IconArchive from '@/assets/icons/archive.svg';
import IconBookmarkDisable from '@/assets/icons/bookmark.svg';
import IconBookmarkActive from '@/assets/icons/bookmark_active.svg';
import React from 'react';

const settingJobs: MenuProps['items'] = [
  {
    label: (
      <div className="flex items-center gap-2 w-[200px]">
        <IconExternalLink />
        <p className="text-base text-[#101828] font-medium">View job</p>
      </div>
    ),
    key: 'View job',
  },
  {
    label: (
      <div className="flex items-center gap-2 w-[200px]">
        <IconCopy />
        <p className="text-base text-[#101828] font-medium">Duplicate</p>
      </div>
    ),
    key: 'Duplicate',
  },
  {
    label: (
      <div className="flex items-center gap-2 w-[200px]">
        <IconArchive />
        <p className="text-base text-[#101828] font-medium">Archive job</p>
      </div>
    ),
    key: 'Archive job',
  },
];

export default function JobsItem({
  jobItem,
  setFollow,
  setModal,
  setEditJob,
}: {
  jobItem: JobListType;
  setFollow: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<number>>;
  setEditJob: React.Dispatch<React.SetStateAction<number>>;
}) {
  const router = useRouter();
  const { member } = useAuth();
  const [setFollowJob, { isLoading: isFollow }] = useSetJobFollowMutation();

  const handleJobFollow = async () => {
    await setFollowJob({ jobId: jobItem?.jobId, userId: member?.userId as number });

    if (!isFollow) setFollow(true);
  };

  const handleMenuItem: MenuProps['onClick'] = ({ key }) => {
    if (key === 'Archive job') setModal(jobItem?.jobId);
  };

  const handleRedirect = async () => {
    router.push(`/jobs/processing/${jobItem?.jobId}/pipeline`);
  };

  return (
    <div className="w-full border boder-[#EDEFF1] rounded-lg p-4 mb-2 last:mb-0 cursor-pointer hover:bg-gray-100 hover:duration-300 hover:ease-in-out">
      <div className="flex items-center justify-between">
        <div className="w-full" onClick={handleRedirect}>
          <p className="text-xl text-black font-medium mb-2">{jobItem?.jobTitle}</p>
          <div className="flex items-center gap-[10px]">
            <p className="text-base text-[#0E181C]">{jobItem?.department}</p>

            {jobItem?.remoteStatus === 1 && (
              <>
                <p className="text-base text-[#4D6670] font-semibold">*</p>
                <p className="text-base text-[#4D6670]">Remote jobs</p>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="default"
            className="!h-9 !border !border-[#D0D5DD] hover:!opacity-75"
            onClick={() => setEditJob(jobItem?.jobId)}
          >
            <div className="flex items-center gap-2">
              <EditOutlined className="!text-[#344054] !text-sm font-semibold" />
              <p className="text-sm text-[#344054] font-semibold">Edit</p>
            </div>
          </Button>
          <Dropdown menu={{ items: settingJobs, onClick: handleMenuItem }} trigger={['click']}>
            <Space className="cursor-pointer py-2">
              <Button type="link" className="!h-9 hover:!opacity-75">
                <MoreOutlined className="!text-sm !text-[#344054] font-semibold" />
              </Button>
            </Space>
          </Dropdown>
        </div>
      </div>
      <Divider />
      <div className="flex items-center justify-between">
        <p className="text-base text-[0E181C] font-medium" onClick={handleRedirect}>
          <span className="font-bold">{jobItem?.candidates}</span>&nbsp;Qualified candidates
        </p>
        <div className="flex items-center gap-4">
          <Button
            type="link"
            className="!px-0 hover:!opacity-75 flex items-center !w-[117px]"
            onClick={handleJobFollow}
          >
            <div className="flex items-center gap-2">
              {jobItem?.followStatus === 1 ? <IconBookmarkActive /> : <IconBookmarkDisable />}

              <p className="text-sm text-[#15242A] font-semibold">Follow this job</p>
            </div>
          </Button>
          <p className="text-lg text-[#EDEFF1]">|</p>
          <Button type="link" className="!px-0 hover:!opacity-75">
            <p className="text-sm text-[#15242A] font-semibold">Internal use</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Modal, Segmented, Skeleton, Drawer } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';

import { EditJob, JobsItem, useAuth } from '@/components';
import { useLazyGetJobListDataQuery, useSetArchiveJobMutation } from '@/features/projects';
import { useSelector } from '@/features/store';

import type { JobListType } from '@/types/jobs';

import { PlusOutlined } from '@ant-design/icons';
import IconFeature from '@/assets/icons/feature.svg';

export default function JobsPage() {
  const router = useRouter();
  const { member } = useAuth();
  const { jobList } = useSelector(state => state.jobs);
  const [trigger, { isLoading }] = useLazyGetJobListDataQuery();
  const [setJobArchive, { isLoading: isArchive }] = useSetArchiveJobMutation();

  const [kindJobKind, setKindJobKind] = useState<number>(0);
  const [follow, setFollow] = useState<boolean>(false);
  const [modal, setModal] = useState<number>(0);
  const [editJob, setEditJob] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (member) {
        await trigger({
          userId: member?.userId,
          companyId: member?.companyId,
          kind: kindJobKind,
        }).unwrap();

        setFollow(false);
      }
    })();
  }, [router, member, kindJobKind, follow]);

  const handleChangeJobsKind = (value: SegmentedValue) => {
    setKindJobKind(value as number);
  };

  const handleJobArchive = async () => {
    await setJobArchive({ jobId: modal, userId: member?.userId as number, archiveStatus: 1 });
    setModal(0);
  };

  return (
    <>
      <Drawer
        placement="right"
        open={editJob !== 0}
        closable={false}
        onClose={() => setEditJob(0)}
        width={700}
        bodyStyle={{ padding: '0' }}
      >
        <EditJob editJob={editJob} setEditJob={setEditJob} />
      </Drawer>
      <Modal
        className="!p-0 !"
        width={435}
        title={
          <div className="flex justify-center">
            <IconFeature />
          </div>
        }
        centered
        open={modal !== 0}
        closable={false}
        footer={
          <div className="p-4 flex items-center justify-between">
            <Button
              type="default"
              className="!w-[193px] !h-[33px] !border-[#D0D5DD] hover:!bg-gray-50 hover:!opacity-75"
              onClick={() => setModal(0)}
            >
              <span className="text-sm text-[#344054] font-semibold">Cancel</span>
            </Button>
            <Button
              type="primary"
              className="!w-[193px] !h-[33px] !bg-mainColor hover:!opacity-75"
              loading={isArchive}
              onClick={handleJobArchive}
            >
              <span className="text-sm font-semibold">Yeah, Archive Jobs</span>
            </Button>
          </div>
        }
      >
        <div className="text-center">
          <h1 className="text-xl text-[#0E181C] font-medium mb-4">Do you want to archive this job?</h1>
          <p className="text-base text-[#666666] font-medium">
            Lorem ipsum is placeholder text commonly <br /> used in the graphic, print, and publishing industries
          </p>
        </div>
      </Modal>
      <div className="py-6 px-8 w-full">
        <div className="flex items-center justify-between h-10 mb-[50px]">
          <Segmented
            className="!rounded-full !bg-[#EDECEA] !border !boder-[#EDEFF1] !h-[42px] !p-1"
            value={kindJobKind}
            options={[
              {
                label: (
                  <div className="h-[34px] w-[150px] flex items-center justify-center gap-[10px]">
                    <p className="text-base font-medium">All Jobs</p>
                    <div className="w-[30px] h-5 bg-[#EDECEA] rounded-md flex items-center justify-center">
                      <p className="text-sm text-[#344054] font-medium">{jobList?.allJobCnt}</p>
                    </div>
                  </div>
                ),
                value: 0,
              },
              {
                label: (
                  <div className="h-[34px] w-[150px] flex items-center justify-center gap-[10px]">
                    <p className="text-base font-medium">Archived</p>
                    <div className="w-[30px] h-5 bg-[#EDECEA] rounded-md flex items-center justify-center">
                      <p className="text-sm text-[#344054] font-medium">{jobList?.archivedJobCnt}</p>
                    </div>
                  </div>
                ),
                value: 1,
              },
            ]}
            onChange={handleChangeJobsKind}
          />
          <Button
            type="primary"
            className="!w-[158px] !h-10 !bg-mainColor hover:!opacity-75"
            onClick={() => router.push('/new_job/create')}
          >
            <div className="flex items-center justify-center gap-2 text-sm font-semibold">
              <span>Add New Job</span>
              <PlusOutlined />
            </div>
          </Button>
        </div>
        <Skeleton active loading={isLoading}>
          {jobList?.jobs?.map((item: JobListType) => (
            <JobsItem
              key={item.jobId}
              jobItem={item}
              setFollow={setFollow}
              setModal={setModal}
              setEditJob={setEditJob}
            />
          ))}
        </Skeleton>
      </div>
    </>
  );
}

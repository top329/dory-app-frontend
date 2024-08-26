'use client';

import { ReactNode, useState } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { Avatar, Button, Col, Drawer, Row, Tabs, Skeleton, Modal } from 'antd';

import { EditJob, useAuth } from '@/components';
import { useSetArchiveJobMutation } from '@/features/projects';
import { useSelector } from '@/features/store';

import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import IconSite from '@/assets/icons/global_black.svg';
import IconEdit from '@/assets/icons/edit.svg';
import IconArchive from '@/assets/icons/archive_black.svg';
import IconFeature from '@/assets/icons/feature.svg';

const tabList = [
  {
    key: 'pipeline',
    label: <p className="text-base font-medium w-24 text-center">Pipeline</p>,
    children: <></>,
  },
  {
    key: 'filters',
    label: <p className="text-base font-medium w-24 text-center">Filters</p>,
    children: <></>,
  },
  {
    key: 'activity',
    label: <p className="text-base font-medium w-24 text-center">Activity</p>,
    children: <></>,
  },
  {
    key: 'analytics',
    label: <p className="text-base font-medium w-24 text-center">Analytics</p>,
    children: <></>,
  },
];

export default function ProcessingLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const param = useParams();
  const pathName = usePathname();
  const { member } = useAuth();
  const { jobInfo } = useSelector(state => state.candidate);
  const [setJobArchive, { isLoading: isArchive }] = useSetArchiveJobMutation();

  const [editJob, setEditJob] = useState<number>(0);
  const [modal, setModal] = useState<number>(0);

  const handleChangeTab = (key: string) => {
    router.push(`/jobs/processing/${param?.id}/${key}`);
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
        onClose={() => {
          setEditJob(0);
        }}
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton loading={!jobInfo} active paragraph={{ rows: 1, width: ['400px'] }}>
              <h3 className="text-2xl text-black font-medium mb-2">{jobInfo?.jobTitle}</h3>
              <p className="text-base text-[#70848C]">
                {jobInfo?.jobCity}, {jobInfo?.jobCountry} ~ Onsite
              </p>
            </Skeleton>
          </div>
          <div className="flex items-center gap-2">
            <Button type="dashed" className="!h-8 !rounded-lg !border-[#294753] hover:!opacity-75">
              <div className="flex items-center gap-2">
                <p className="text-xs text-[#0E181C] font-medium">Add Contributors</p>
                <PlusOutlined className="!text-base !text-[#0E181C]" />
              </div>
            </Button>
            <Avatar size={32} icon={<UserOutlined />} />
          </div>
        </div>
        <Row gutter={24}>
          <Col span={12} className="!pr-0">
            <Tabs defaultActiveKey={pathName?.split('/')[4]} items={tabList} onChange={handleChangeTab} />
          </Col>
          <Col span={12} className="!pl-0">
            <div className="w-full border-b border-b-[#f0f0f0] h-12 flex items-center justify-end gap-5">
              {jobInfo?.archiveStatus === 0 && (
                <Button type="link" className="hover:!opacity-75">
                  <div className="flex items-center gap-2" onClick={() => setModal(Number(param?.id))}>
                    <IconArchive />
                    <p className="text-base text-black font-medium">Archive this job</p>
                  </div>
                </Button>
              )}
              <Button type="link" className="hover:!opacity-75">
                <div className="flex items-center gap-2">
                  <IconSite />
                  <p className="text-base text-black font-medium">Show job site</p>
                </div>
              </Button>
              <Button type="link" className="hover:!opacity-75" onClick={() => setEditJob(Number(param?.id))}>
                <div className="flex items-center gap-2">
                  <IconEdit />
                  <p className="text-base text-black font-medium">Edit</p>
                </div>
              </Button>
            </div>
          </Col>
        </Row>
        <div>{children}</div>
      </div>
    </>
  );
}

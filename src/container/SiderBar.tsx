'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Layout, Button, Menu, Tooltip } from 'antd';
import { type MenuItem } from '@/types/global';

import IconHome from '@/assets/icons/home.svg';
import IconCollaborating from '@/assets/icons/collaborating.svg';
import IconAnalytics from '@/assets/icons/analytics.svg';
import IconJobs from '@/assets/icons/jobs_1.svg';
import IconJobPosting from '@/assets/icons/upload.svg';
import IconUsers from '@/assets/icons/users.svg';
import IconLive from '@/assets/icons/microphone.svg';
import IconTemplate from '@/assets/icons/template_1.svg';
import IconUser from '@/assets/icons/user.svg';
import IconSettings from '@/assets/icons/settings.svg';
import IconArrowLeft from '@/assets/icons/circle_arrow_left.svg';
import IconArrowRight from '@/assets/icons/circle_arrow_right.svg';
import { PlusOutlined } from '@ant-design/icons';

const { Sider } = Layout;

interface SideBarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  broken: boolean;
  setBroken: React.Dispatch<React.SetStateAction<boolean>>;
}

const MENUS: MenuItem[] = [
  {
    label: 'Overview',
    key: 'overview',
    icon: <IconHome />,
  },
  {
    label: 'Collaborating',
    key: 'collaborating',
    icon: <IconCollaborating />,
    children: [
      {
        label: <Link href="/thread">Thread</Link>,
        key: 'thread',
      },
      {
        label: <Link href="/collaborating/all_task">All Tasks</Link>,
        key: 'all_task',
      },
      {
        label: <Link href="/collaborating/evaluation_request">Evaluation Request</Link>,
        key: 'evaluation_request',
      },
      {
        label: <Link href="/collaborating/hired_candidate">Hired Candidate</Link>,
        key: 'hired_candidate',
      },
    ],
  },
  {
    label: 'Analytics',
    key: 'analytics',
    icon: <IconAnalytics />,
    children: [
      {
        label: <Link href="/candidates">Candidates</Link>,
        key: 'candidates',
      },
      {
        label: <Link href="/career_site">Career Site</Link>,
        key: 'career_site',
      },
    ],
  },
  {
    label: <Link href="/jobs">Jobs</Link>,
    key: 'jobs',
    icon: <IconJobs />,
  },
  {
    label: <Link href="/job_posting">Job Posting</Link>,
    key: 'job_posting',
    icon: <IconJobPosting />,
  },
  {
    label: <Link href="/candidate">Candidate</Link>,
    key: 'candidate',
    icon: <IconUsers />,
  },
  {
    label: <Link href="/live_interview">Live Interview</Link>,
    key: 'live_interview',
    icon: <IconLive />,
  },
  {
    label: <Link href="/templates">Template</Link>,
    key: 'templates',
    icon: <IconTemplate />,
  },
  {
    label: <Link href="/users">Users</Link>,
    key: 'users',
    icon: <IconUser />,
  },
  {
    label: '',
    key: 'empty',
  },
  {
    label: <Link href="/settings">Settings</Link>,
    key: 'settings',
    icon: <IconSettings className="w-5 h-5" />,
  },
];

export default function SiderBar({ broken, collapsed, setBroken, setCollapsed }: SideBarProps) {
  const router = useRouter();

  const [currentKey, setCurrentKey] = useState<string>('');

  useEffect(() => {
    setCollapsed(broken);

    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem('menuPath')) {
        setCurrentKey(window.localStorage.getItem('menuPath') as string);
      } else {
        setCurrentKey('overview');
      }
    }
  }, [broken, setCollapsed]);

  return (
    <>
      {collapsed && (
        <style jsx global>
          {`
            .ant-menu-item-icon {
              margin-top: 14px !important;
            }

            .ant-menu-item {
              width: 48px !important;
              padding: 0 !important;
              margin: 0 auto !important;
              text-align: center;
            }

            .ant-menu-item span {
              display: none !important;
            }

            .ant-menu-item-only-child {
              width: calc(100% - 8px) !important;
              text-align: left !important;
              padding-inline: 16px !important;
              margin-block: 4px !important;
            }

            .ant-menu-item-only-child span {
              display: inline-block !important;
            }

            .ant-menu-submenu-title {
              width: 48px !important;
              padding: 0 !important;
              margin: 0 auto !important;
              text-align: center !important;
            }

            .ant-menu-submenu-title > span:nth-child(2) {
              display: none !important;
            }
          `}
        </style>
      )}

      <Sider
        className="!bg-[#29292A] !min-h-full"
        width={270}
        breakpoint="xl"
        onBreakpoint={(e: boolean) => setBroken(e)}
        collapsedWidth={110}
        collapsed={collapsed}
        trigger={collapsed ? <IconArrowRight /> : <IconArrowLeft />}
      >
        <span
          className={`ant-layout-sider-zero-width-trigger !bg-transparent !right-[-15px] !top-5 !w-[30px] !h-[30px] !rounded-full`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <IconArrowRight /> : <IconArrowLeft />}
        </span>
        <div className="px-[14px] py-4 flex flex-col items-center h-full overflow-y-auto overflow-x-hidden">
          {!collapsed && (
            <Button
              className="!bg-mainColor hover:!opacity-75 text-base font-semibold leading-[24px] w-[215px] mb-4 !h-10"
              type="primary"
              onClick={() => router.push('/new_job/create')}
            >
              <div className="flex items-center justify-center gap-2">
                <p>Add New Job</p>
                <PlusOutlined className="!text-white" />
              </div>
            </Button>
          )}

          {collapsed && (
            <Tooltip title="Add New Job" placement="right">
              <Button
                className="!bg-mainColor hover:!opacity-75 text-base text-white font-semibold leading-[24px] !w-[55px] mb-4 !h-10"
                type="primary"
                icon={<PlusOutlined className="text-white" />}
                onClick={() => router.push('/new_job')}
              ></Button>
            </Tooltip>
          )}

          <Menu
            mode="inline"
            items={MENUS}
            selectedKeys={[currentKey]}
            onClick={e => {
              typeof window !== 'undefined' && window.localStorage.setItem('menuPath', e.key);
              setCurrentKey(e.key);
              router.push(`/${e.key}`);
            }}
          />
        </div>
      </Sider>
    </>
  );
}

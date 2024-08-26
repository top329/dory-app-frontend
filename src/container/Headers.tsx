'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layout, Dropdown, Space, Button, Avatar } from 'antd';
import type { MenuProps } from 'antd';

import { useAuth } from '@/components';
import type { UserResponse } from '@/types/auth';

import IconLogo from '@/assets/icons/logo_white.svg';
import IconLink from '@/assets/icons/link_white.svg';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

const { Header } = Layout;

export default function Headers() {
  const { settingMenu, member } = useAuth();
  const [company, setCompany] = useState<string>('Dory company');
  const [memberInfo, setMemberInfo] = useState<UserResponse | null>(null);

  const companies: MenuProps['items'] = [
    {
      label: (
        <Button type="link" className="!text-[#344054] !text-sm !px-0" onClick={() => setCompany('Company 1')}>
          Company 1
        </Button>
      ),
      key: 'company_1',
    },
    {
      label: (
        <Button type="link" className="!text-[#344054] !text-sm !px-0" onClick={() => setCompany('Company 2')}>
          Company 2
        </Button>
      ),
      key: 'company_2',
    },
  ];

  useEffect(() => {
    if (member) setMemberInfo(member);
  }, [member]);

  return (
    <Header className="w-full !h-[75px] !border-b !border-b-[#3A3A3C] flex items-center justify-between !bg-[#29292A] !px-8">
      <div className="flex items-center gap-6">
        <Link href="/overview">
          <IconLogo />
        </Link>
        <Dropdown menu={{ items: companies, selectable: true }} trigger={['click']}>
          <div className="flex items-center justify-center gap-2 cursor-pointer h-10 w-[153px] bg-[#3A3A3C] rounded-lg">
            <p className="text-sm leading-5 font-semibold text-white">{company}</p>
            <DownOutlined className="!text-white !w-5 !h-5" />
          </div>
        </Dropdown>
      </div>
      <div className="flex items-center justify-end gap-10 w-full md:w-auto">
        <Link className="text-base font-semibold !text-white hidden items-center gap-2 sm:flex" href="#">
          <p>Visit Website</p>
          <IconLink />
        </Link>
        <div className="h-[26px] border-r-2 border-[#3A3A3C] hidden sm:block"></div>
        <Dropdown menu={{ items: settingMenu }} trigger={['click']}>
          <Space className="cursor-pointer py-2">
            <div className="flex items-center gap-3">
              <div className="text-end hidden sm:block min-w-[200px]">
                <h3 className="text-lg text-white font-medium">
                  {memberInfo?.firstName} {memberInfo?.lastName}
                </h3>
                <p className="text-sm text-[#B3B3B3]">{memberInfo?.email}</p>
              </div>
              <Avatar size={44} {...(memberInfo?.photoNormal !== '' ? { src: memberInfo?.photoNormal } : { icon: <UserOutlined /> })} />
            </div>
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
}

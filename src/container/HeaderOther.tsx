'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layout, Dropdown, Space, Button, Avatar } from 'antd';
import type { MenuProps } from 'antd';

import { useAuth } from '@/components';
import type { UserResponse } from '@/types/auth';

import IconLogo from '@/assets/icons/logo_2.svg';
import IconBuilding from '@/assets/icons/building_black.svg';
import IconDown from '@/assets/icons/arrow_down.svg';
import IconLink from '@/assets/icons/link_black.svg';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

export default function HeaderOther() {
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
    <Header className="w-full !h-[75px] !border-b !border-b-[#EDEFF1] flex items-center justify-between !bg-white !px-[34px]">
      <div className="h-[75px] flex items-center justify-center">
        <Link className="flex items-center" href="/">
          <IconLogo />
          <h3 className="text-lg text-[#294753] font-bold ml-2">Logoipsum</h3>
        </Link>
      </div>
      <div className="flex items-center">
        <IconBuilding />
        <Dropdown menu={{ items: companies, selectable: true }} trigger={['click']} className="ml-2">
          <Space className="cursor-pointer py-2">
            <p className="text-sm leading-5 font-semibold text-[#344054]">{company}</p>
            <IconDown className="ml-3" />
          </Space>
        </Dropdown>
      </div>
      <div className="flex items-center justify-end gap-10 w-full md:w-auto">
        <Link className="text-base font-semibold !text-[#15242A] hidden items-center sm:flex" href="#">
          <span>Visit Website</span>
          &nbsp;
          <IconLink />
        </Link>
        <div className="h-[26px] border-r-2 border-[#EDEFF1] hidden sm:block"></div>
        <Dropdown menu={{ items: settingMenu }} trigger={['click']}>
          <Space className="cursor-pointer py-2">
            <div className="flex items-center gap-3">
              <div className="text-end hidden sm:block min-w-[200px]">
                <h3 className="text-lg text-black font-medium">
                  {memberInfo?.firstName} {memberInfo?.lastName}
                </h3>
                <p className="text-sm text-black">{memberInfo?.email}</p>
              </div>
              <Avatar size={44} {...(memberInfo?.photoNormal !== '' ? { src: memberInfo?.photoNormal } : { icon: <UserOutlined /> })} />
            </div>
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
}

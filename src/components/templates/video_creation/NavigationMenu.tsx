import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('Hiring roles', '1'),
    getItem('Billing', '2'),

    getItem('Workflow', 'sub1', <MailOutlined />, [
        getItem('Requestion approvals', '3'), 
        getItem('Disqulify reasons', '4'), 
        getItem('Departments', '5'),
    ]),
    
    getItem('Edit Template', 'sub2', <AppstoreOutlined />, [
        getItem('Workflow', '6'),
        getItem('Questionnaires', '7'),
        getItem('Email and messages', '8'),
        getItem('Introduction Video', '9'),
        getItem('Video Question', '10'),
        getItem('Evaluation forms', '11'),
        getItem('Offer letter', '12'),
        getItem('Onboarding pack', '13'),
        getItem('Docs collection', '14'),
    ]),

    { type: 'divider' },
];

const NavigationMenu: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    
  };

  return (
    <Menu
      onClick={onClick}
      theme={'light'}
      className='!h-[92vh]'
      defaultSelectedKeys={['3']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default NavigationMenu;

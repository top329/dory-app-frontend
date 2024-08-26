'use client';

import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Button, type MenuProps } from 'antd';
import { useDispatch } from '@/features/store';
import { UserResponse } from '@/types/auth';
import { logout } from '@/features/projects/auth';

type Context = {
  settingMenu: MenuProps['items'];
  member: UserResponse | null;
  accessToken: string;
  expireDate: number;
  selectMember: (member?: UserResponse) => void;
  selectAccessToken: (token: string) => void;
  getSelectMember: () => void;
  selectExpireDate: (time: number) => void;
};

const AuthContext = createContext<Context | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  const initAccessToken = typeof window !== 'undefined' ? (window.sessionStorage.getItem('accessToken') as string) : '';
  const initMember = typeof window !== 'undefined' ? JSON.parse(window.sessionStorage.getItem('member') as string) : null;
  const initExpireDate = typeof window !== 'undefined' ? parseInt(window.sessionStorage.getItem('expireDate') as string, 10) : 0;

  const [accessToken, setAccessToken] = useState<string>(initAccessToken);
  const [member, setMember] = useState<UserResponse | null>(initMember);
  const [expireDate, setExpireDate] = useState<number>(initExpireDate);

  const settingMenu: MenuProps['items'] = [
    {
      label: (
        <>
          {member?.firstName} {member?.lastName}
        </>
      ),
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Button type="link" className="!text-[#344054] !text-sm !px-0 !w-full !text-start" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      ),
      key: 'logout',
    },
  ];

  const selectMember = (member?: UserResponse) => {
    if (member) {
      setMember(member);
      typeof window !== 'undefined' && window.sessionStorage.setItem('member', JSON.stringify(member));
    } else {
      typeof window !== 'undefined' && window.sessionStorage.removeItem('member');
      setMember(null);
    }
  };

  const selectAccessToken = (token: string) => {
    setAccessToken(token);
  };

  const selectExpireDate = (time: number) => {
    setExpireDate(time);
  };

  const getSelectMember = () => {
    if (typeof window !== 'undefined') {
      setMember(JSON.parse(window.sessionStorage.getItem('member') as string));
    }
  };

  return (
    <AuthContext.Provider
      value={{ settingMenu, member, accessToken, expireDate, selectMember, getSelectMember, selectAccessToken, selectExpireDate }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): Context {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

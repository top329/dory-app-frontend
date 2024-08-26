'use client';

import { forwardRef } from 'react';
import { Avatar, Button, Progress } from 'antd';

import { UserOutlined } from '@ant-design/icons';

interface CustomAlertProps {
  show: boolean;
  position: 'top' | 'bottom';
  avatarUrl: string;
  title: string;
  persent?: number;
  onClose?: () => void;
}

const CustomAlert = forwardRef<HTMLDivElement, CustomAlertProps>(
  ({ show, avatarUrl = '', title, persent = 0, position = 'bottom', onClose }, ref) => {
    return (
      <div
        ref={ref}
        className={`fixed bg-[#001B31] rounded-lg left-1/2 w-[420px] transition duration-1000 ${
          show ? `opacity-1 transition duration-1000` : `opacity-0 transition duration-1000`
        } ${position === 'bottom' ? 'bottom-10' : 'top-10'}`}
      >
        <div className="relative">
          <div className="flex items-center justify-between gap-28 p-4">
            <div className="flex items-center gap-2">
              <Avatar
                size={24}
                className="!bg-white"
                {...(avatarUrl !== '' ? { src: avatarUrl } : { icon: <UserOutlined className="!text-[#001B31]" /> })}
              />
              <p className="text-base text-white">{title}</p>
            </div>
            {onClose && (
              <Button
                type="link"
                className="!h-[33px] !border-[#FDA29B] !text-[#F89A93] font-semibold hover:!opacity-75"
              >
                Cancel
              </Button>
            )}
          </div>
          <div className="absolute left-0 right-0 bottom-[-5px]">
            <Progress percent={persent} showInfo={false} strokeColor="#D0F1E1" className="!m-0" />
          </div>
        </div>
      </div>
    );
  }
);

CustomAlert.displayName = 'CustomAlert';
export default CustomAlert;

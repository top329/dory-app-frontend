import Link from 'next/link';
import { Avatar, Tag } from 'antd';

import type { ColumnsType } from 'antd/es/table';
import type { DashboardCandidateList } from '@/types/dashboard';

import { UserOutlined, EyeOutlined } from '@ant-design/icons';

export const Columns: ColumnsType<DashboardCandidateList> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (_, record: DashboardCandidateList) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar
            size={36}
            {...(record?.photoThumb !== '' ? { src: record?.photoThumb } : { icon: <UserOutlined /> })}
          />
          <div>
            <p className="text-base text-[#050505] font-medium">{record?.name}</p>
            <p className="text-xs text-[#404040]">{record?.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    title: 'Position',
    dataIndex: 'position',
    render: (_, record: DashboardCandidateList) => {
      return <p className="text-base text-[#0E181C]">{record?.position}</p>;
    },
  },
  {
    title: 'Status',
    dataIndex: 'stage',
    render: (_, record: DashboardCandidateList) => {
      return (
        <Tag color={record?.stageColor}>
          <span
            className={`text-[10px] font-medium ${
              record?.stageName === 'Sourced' ||
              record?.stageName === 'Apply' ||
              record?.stageName === 'Evaluation' ||
              record?.stageName === 'Offer' ||
              record?.stageName === 'Hired'
                ? 'text-[#344054]'
                : ''
            }`}
          >
            {record?.stageName}
          </span>
        </Tag>
      );
    },
  },
  {
    title: ' ',
    dataIndex: '',
    render: () => {
      return (
        <Link className="cursor-pointer text-[#050505] hover:text-[#050505]" href="#">
          <EyeOutlined />
        </Link>
      );
    },
  },
];

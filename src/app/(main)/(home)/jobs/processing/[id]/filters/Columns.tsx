import { Avatar, Tag } from 'antd';

import type { ColumnsType } from 'antd/es/table';
import type { CandidatesType } from '@/types/candidate';

import { UserOutlined, StarFilled } from '@ant-design/icons';

export const Columns: ColumnsType<CandidatesType> = [
  {
    title: 'Account ID',
    dataIndex: 'candidateId',
    render: (_, record: CandidatesType) => (
      <div className="flex items-center gap-3">
        <Avatar size={24} {...(record?.photoThumb !== '' ? { src: record?.photoThumb } : { icon: <UserOutlined /> })} />
        <p className="text-base text-black font-medium">{record?.name}</p>
      </div>
    ),
  },
  {
    title: 'Rating Score',
    dataIndex: 'ratingScore',
    render: (_, record: CandidatesType) => (
      <div className="flex items-center gap-2">
        <StarFilled className="!text-[#F1B928] !text-[14px]" />
        <p className="text-base text-[#0E181C] font-medium">{record?.ratingScore}</p>
      </div>
    ),
  },
  {
    title: 'Jobs',
    dataIndex: 'ratingScore',
    render: (_, record: CandidatesType) => <p className="text-base text-[#0E181C]">{record?.job}</p>,
  },
  {
    title: 'Stage',
    dataIndex: 'stageName',
    render: (_, record: CandidatesType) => (
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
    ),
  },
  {
    title: 'Video',
    dataIndex: 'videoStatus',
    render: (_, record: CandidatesType) => <p className="text-base text-[#050505]">{record?.videoStatus}</p>,
  },
  {
    title: 'Date Created',
    dataIndex: 'createDate',
    render: (_, record: CandidatesType) => <p className="text-base text-[#050505]">{record?.createDate}</p>,
  },
  {
    title: 'Talent Pool',
    dataIndex: 'talentPool',
    render: (_, record: CandidatesType) =>
      record?.talentPool && record?.talentPool !== '' ? (
        <p className="text-base text-[#050505]">{record?.talentPool}</p>
      ) : (
        <p className="text-base text-[#050505]">-</p>
      ),
  },
];

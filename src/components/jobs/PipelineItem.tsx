'use client';

import { Button, Dropdown, MenuProps, Space, Tag } from 'antd';
import { Droppable } from '@hello-pangea/dnd';

import { CandidateItem } from '..';
import { CandidatesType, PipelineType } from '@/types/candidate';

import { MoreOutlined, SelectOutlined } from '@ant-design/icons';

interface PipelineItemProps {
  item: PipelineType;
  index: number;
}

const settingJobs: MenuProps['items'] = [
  {
    label: (
      <div className="flex items-center gap-2 w-[150px]">
        <SelectOutlined />
        <p className="text-base text-[#101828] font-medium">Deselect all</p>
      </div>
    ),
    key: 'Deselect all',
  },
];

export default function PipelineItem({ item, index }: PipelineItemProps) {
  return (
    <>
      <div className="min-w-[287px] max-h-full">
        <div className="w-full h-9 rounded-lg border border-[#EDEFF1] px-4 py-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Tag color={item.stageColor}>
              <span
                className={`text-[10px] font-medium ${
                  item.stageName === 'Sourced' ||
                  item.stageName === 'Apply' ||
                  item.stageName === 'Evaluation' ||
                  item.stageName === 'Offer' ||
                  item.stageName === 'Hired'
                    ? 'text-[#344054]'
                    : ''
                }`}
              >
                {item.stageName}
              </span>
            </Tag>
            <p className="text-xs text-[#344054] font-medium">{item.candidateCnt}</p>
          </div>
          <Dropdown menu={{ items: settingJobs }} trigger={['click']}>
            <Space className="cursor-pointer py-2">
              <Button
                type="link"
                icon={<MoreOutlined className="!text-[#98A2B3]" />}
                className="!p-0 !w-[22px] !h-[22px] hover:!bg-gray-200"
              />
            </Space>
          </Dropdown>
        </div>
        <Droppable droppableId={`${index}`}>
          {provided => (
            <div
              className="w-full min-h-[calc(100vh-420px)] bg-[#EAE7E6] bg-opacity-20 rounded-xl p-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {item?.candidates?.map((rs: CandidatesType, key: number) => (
                <CandidateItem key={rs.candidateId} item={rs} index={key} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
}

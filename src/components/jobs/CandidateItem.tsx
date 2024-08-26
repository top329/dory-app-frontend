'use client';

import { Avatar, Card, Divider } from 'antd';
import { Draggable } from '@hello-pangea/dnd';

import type { CandidatesType } from '@/types/candidate';

import { StarFilled, UserOutlined } from '@ant-design/icons';
import IconVideoNone from '@/assets/icons/video_none.svg';
import IconSearch from '@/assets/icons/file_search_1.svg';
import IconMessage from '@/assets/icons/message.svg';

interface CandidateItemProps {
  index: number;
  item: CandidatesType;
}

export default function CandidateItem({ item, index }: CandidateItemProps) {
  return (
    <Draggable draggableId={item?.candidateId?.toString() as string} index={index}>
      {provided => (
        <>
          <Card
            bodyStyle={{ padding: '12px' }}
            className="cursor-pointer !mb-2 last:!mb-0"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="flex items-start gap-2 w-full">
              <div>
                <Avatar
                  size={28}
                  {...(item?.photoThumb !== '' ? { src: item?.photoThumb } : { icon: <UserOutlined /> })}
                />
              </div>
              <div className="w-full">
                <div className="flex justify-between w-full">
                  <p className="font-semibold">{item?.name}</p>
                  <p className="text-xs text-[#94A3A9] pt-1">{item?.appliedDate}</p>
                </div>
                <p className="text-sm text-[#8C8C8C]">{item?.email}</p>
              </div>
            </div>
            <Divider className="!my-2" />
            <div className="flex items-center gap-3">
              <div>
                <IconVideoNone />
              </div>
              <p className="text-[#EDEFF1] font-medium">|</p>
              <div className="flex items-center gap-1">
                <div>
                  <StarFilled className="!text-[#F1B928] !text-sm" />
                </div>
                <p className="text-sm text-[#050505]">
                  {parseFloat(item?.ratingScore as unknown as string).toFixed(1)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <div>
                  <IconSearch />
                </div>
                <p className="text-sm text-[#050505]">3</p>
              </div>
              <div className="flex items-center gap-1">
                <div>
                  <IconMessage />
                </div>
                <p className="text-sm text-[#050505]">3</p>
              </div>
            </div>
          </Card>
        </>
      )}
    </Draggable>
  );
}

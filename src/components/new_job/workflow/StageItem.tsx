'use client';

import { useRef } from 'react';
import { Card, Col, FormInstance, Row, Tag } from 'antd';

import IconEdit from '@/assets/icons/edit.svg';
import IconDelete from '@/assets/icons/delete.svg';

type WorkflowItemStageProps = {
  id: number;
  isDelete?: boolean;
  title: string;
  tagTitle: string;
  tagColor: string;
  onEdit: (id: number) => void;
  onDelete?: (id: number) => void;
  form?: FormInstance<any>;
};

export default function WorkflowStageItem({
  id,
  title,
  tagTitle,
  tagColor,
  isDelete,
  onEdit,
  onDelete,
}: WorkflowItemStageProps) {
  const handleEdit = (id: number) => {
    onEdit(id);
  };

  const handleDelete = (id: number) => {
    if (onDelete) onDelete(id);
  };

  return (
    <Card className="cursor-move" bodyStyle={{ padding: '10px 14px 10px 28px' }}>
      <Row gutter={24}>
        <Col span={19}>
          <div className="flex items-center gap-2">
            <p className="text-base text-[#101828] font-medium">{title}</p>

            {tagTitle !== 'No type' && (
              <Tag
                color={`${
                  tagColor ? tagColor : tagTitle === 'Sourced' ? '#EDECEA' : tagTitle === 'Hired' ? '#D4FF6F' : ''
                }`}
              >
                <span
                  className={`text-[10px] font-medium ${
                    tagTitle === 'Sourced' ||
                    tagTitle === 'Apply' ||
                    tagTitle === 'Evaluation' ||
                    tagTitle === 'Offer' ||
                    tagTitle === 'Hired'
                      ? 'text-[#344054]'
                      : ''
                  }`}
                >
                  {tagTitle}
                </span>
              </Tag>
            )}
          </div>
          <div className="flex items-center gap-2"></div>
        </Col>
        <Col span={5}>
          <div className="flex items-center justify-end gap-2">
            <div className="cursor-pointer" onClick={() => handleEdit(id)}>
              <IconEdit />
            </div>

            {isDelete && (
              <div className="cursor-pointer" onClick={() => handleDelete(id)}>
                <IconDelete />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
}

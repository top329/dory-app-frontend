'use client';

import { ChangeEvent, useRef } from 'react';
import { Button, Col, Form, FormInstance, FormListFieldData, Input, Row } from 'antd';
import { type DragObjectFactory, useDrag, useDrop } from 'react-dnd';
import type { XYCoord } from 'dnd-core';

import IconDrag from '@/assets/icons/drag.svg';
import { CloseOutlined } from '@ant-design/icons';

const ItemTypes = {
  CARD: 'item',
};

interface AnswerItemProps {
  id: number;
  index: number;
  field: FormListFieldData;
  remove: (index: number | number[]) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  totalCnt: number;
  form: FormInstance<any>;
}

interface DragItem {
  index: number;
  id: number;
}

interface DragResult {
  isDragging: boolean;
}

export default function AnswerItem({ id, index, field, totalCnt, remove, moveCard, form }: AnswerItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: string | symbol | null }>({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{}, drag] = useDrag<DragObjectFactory<DragItem>, DragResult, DragResult>({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      form.setFields([{ name: ['answers', id, 'answer'], errors: undefined, value: e.target.value }]);
    } else {
      form.setFields([{ name: ['answers', id, 'answer'], errors: ['This is a required field.'], value: '' }]);
    }
  };

  return (
    <Row>
      <Col span={1} ref={ref} data-handler-id={handlerId}>
        <div className="flex items-center justify-center pt-2 h-1/2 cursor-move">
          <IconDrag />
        </div>
      </Col>
      <Col span={22}>
        <Form.Item name={[field.name, 'answer']}>
          <Input className="!h-9" onChange={handleChangeAnswer} />
        </Form.Item>
      </Col>
      <Col span={1}>
        {totalCnt > 1 && (
          <Button
            type="link"
            className="!text-[#344054]"
            icon={<CloseOutlined />}
            onClick={() => {
              remove(field.name);
            }}
          />
        )}
      </Col>
    </Row>
  );
}

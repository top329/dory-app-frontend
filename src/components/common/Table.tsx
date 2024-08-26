'use client';

import { useState } from 'react';
import { Table as AntTable, TableProps as AntTableProps, Button, Empty, EmptyProps, PaginationProps } from 'antd';

import IconLeft from '@/assets/icons/arrow-left.svg';
import IconRight from '@/assets/icons/arrow-right-black.svg';

interface TableProps extends AntTableProps<any> {
  data: any[];
  emptyProps?: EmptyProps;
  totalCnt: number;
  pageSize: number;
  currentPage: number;
}

export default function Table({
  data = [],
  columns = [],
  loading,
  size = 'small',
  bordered = false,
  emptyProps = {},
  scroll = { x: 'max-content' },
  pagination,
  pageSize = 10,
  totalCnt,
  currentPage,
  ...rest
}: TableProps) {
  const totalPage = totalCnt % pageSize === 0 ? totalCnt / pageSize : Math.floor(totalCnt / pageSize) + 1;

  const itemRender: PaginationProps['itemRender'] = (
    _,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactNode
  ) => {
    if (type === 'prev') {
      return (
        <Button
          type="default"
          disabled={currentPage <= 1}
          className={`${currentPage <= 1 ? '!cursor-not-allowed !opacity-50' : ''} !absolute !left-5`}
        >
          <div className="flex items-center gap-2">
            <IconLeft />
            <p className="text-sm text-[#344054] font-semibold">Previous</p>
          </div>
        </Button>
      );
    }

    if (type === 'next') {
      return (
        <Button
          type="default"
          disabled={currentPage >= totalPage}
          className={`${currentPage >= totalPage ? '!cursor-not-allowed !opacity-50' : ''} !absolute !right-5`}
        >
          <div className="flex items-center gap-2">
            <p className="text-sm text-[#344054] font-semibold">Next</p>
            <IconRight />
          </div>
        </Button>
      );
    }

    return originalElement;
  };

  return (
    <div className="relative">
      <AntTable
        size={size}
        bordered={bordered}
        dataSource={data}
        columns={columns}
        loading={loading}
        scroll={scroll}
        pagination={
          pagination && totalPage > 1
            ? {
                position: ['bottomCenter'],
                showSizeChanger: false,
                size: 'default',
                itemRender,
                ...pagination,
              }
            : false
        }
        locale={{ emptyText: <Empty {...emptyProps} /> }}
        {...rest}
      />
    </div>
  );
}

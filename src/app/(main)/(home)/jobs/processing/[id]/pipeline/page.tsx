'use client';

import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Button, Checkbox, Drawer, Dropdown, MenuProps, Skeleton, Space, theme } from 'antd';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import { useSelector } from '@/features/store';
import { useGetPipelineInfoQuery, useSetUpdateCandidateStageMutation } from '@/features/projects';
import { Candidates, CustomAlert, PipelineItem, useAuth } from '@/components';
import { Option, PIPLINE_SETTING_ITEMS } from '@/types/global';
import type { CandidateStageParam, CandidatesType, PipelineType } from '@/types/candidate';
import { WORKFLOW_STAGE_TYPE } from '@/types/workflow';

import { PlusOutlined } from '@ant-design/icons';
import IconFilter from '@/assets/icons/filter-funnel.svg';
import IconSetting from '@/assets/icons/settings_1.svg';
import IconCancel from '@/assets/icons/circle_border_close.svg';

const { useToken } = theme;

export default function PipelinePage() {
  const param = useParams();
  const { token } = useToken();
  const { member } = useAuth();
  const { pipeLines } = useSelector(state => state.candidate);
  const { isLoading: isPipelineInfo } = useGetPipelineInfoQuery({ jobId: Number(param?.id) });
  const [setUpdateCandidateStage, { isLoading: isStaging }] = useSetUpdateCandidateStageMutation();

  const [pipelineData, setPipelineData] = useState<PipelineType[] | undefined>([]);
  const [width, setWidth] = useState<number>(0);
  const [candidate, setCandidate] = useState<boolean>(false);
  const [sort, setSort] = useState<string>('None');

  const PIPLINE_SORT_ITEMS: MenuProps['items'] = [
    {
      label: (
        <div className="flex items-center" onClick={() => setSort('None')}>
          <p className="text-base text-[#101828] font-medium">None</p>
        </div>
      ),
      key: 'None',
    },
    {
      label: (
        <div className="flex items-center" onClick={() => setSort('Name')}>
          <p className="text-base text-[#101828] font-medium">Name</p>
        </div>
      ),
      key: 'Name',
    },
    {
      label: (
        <div className="flex items-center" onClick={() => setSort('Evaluation score')}>
          <p className="text-base text-[#101828] font-medium">Evaluation score</p>
        </div>
      ),
      key: 'Evaluation score',
    },
    {
      label: (
        <div className="flex items-center" onClick={() => setSort('Date created')}>
          <p className="text-base text-[#101828] font-medium">Date created</p>
        </div>
      ),
      key: 'Date created',
    },
    {
      label: (
        <div className="flex items-center" onClick={() => setSort('New')}>
          <p className="text-base text-[#101828] font-medium">New</p>
        </div>
      ),
      key: 'New',
    },
    {
      label: (
        <div className="flex items-center" onClick={() => setSort('Overdue')}>
          <p className="text-base text-[#101828] font-medium">Overdue</p>
        </div>
      ),
      key: 'Overdue',
    },
  ];

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  useEffect(() => {
    if (pipeLines) {
      setPipelineData(pipeLines?.pipelineContents);
    }
  }, [pipeLines?.pipelineContents]);

  useEffect(() => {
    setWidth(typeof window !== 'undefined' ? window.document.body.clientWidth : 0);
  }, [width, setWidth]);

  const handleRemoveFromList = (item: PipelineType, index: number) => {
    const pipeLine = { ...item, candidates: [...item.candidates] };
    const [removed] = pipeLine.candidates.splice(index, 1);
    return [removed, pipeLine];
  };

  const handleAddToList = useCallback((item: PipelineType, index: number, removeElement: CandidatesType) => {
    const pipeLine = { ...item, candidates: [...item.candidates] };
    pipeLine.candidates.splice(index, 0, removeElement);
    return pipeLine;
  }, []);

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      if (!result.destination) return;

      const listCopy = [...(pipelineData as PipelineType[])];
      const sourceList = listCopy?.[Number(result.source.droppableId)];

      const queryParam: CandidateStageParam = {
        userId: member?.userId as number,
        companyId: member?.companyId as number,
        candidateId: Number(result.draggableId),
        jobId: Number(param?.id),
        sourceJobStageId: Number(listCopy?.[Number(result.source.droppableId)]?.stageId),
        destJobStageId: Number(listCopy?.[Number(result.destination.droppableId)]?.stageId),
        prevStageName: sourceList.stageName,
        nextStageName: listCopy?.[Number(result.destination.droppableId)]?.stageName,
        sendEmail: true,
        sourceCandidateIds: [],
      };

      const [removedElement, newSourceList] = handleRemoveFromList(sourceList, result.source.index);
      listCopy[Number(result.source.droppableId)] = newSourceList as PipelineType;
      const destinationList = listCopy[Number(result.destination.droppableId)];

      listCopy[Number(result.destination.droppableId)] = handleAddToList(
        destinationList,
        result.destination.index,
        removedElement
      );

      setPipelineData(listCopy);

      const sourceCandidateIds: (number | undefined)[] = listCopy[Number(result.source.droppableId)]?.candidates?.map(
        (item: CandidatesType) => item.candidateId
      );

      const destCandidateIds: (number | undefined)[] = listCopy[
        Number(result.destination.droppableId)
      ]?.candidates?.map((item: CandidatesType) => item.candidateId);

      await setUpdateCandidateStage({
        ...queryParam,
        sourceCandidateIds,
        ...(queryParam.nextStageName !== queryParam.prevStageName ? { destCandidateIds } : {}),
      });
    },
    [pipelineData, handleAddToList]
  );

  return (
    <>
      <CustomAlert
        show={isStaging}
        position="bottom"
        avatarUrl={member?.photoThumb as string}
        title="Move and send email..."
      />
      <Drawer
        placement="right"
        open={candidate}
        closable={false}
        onClose={() => setCandidate(false)}
        width={784}
        bodyStyle={{ padding: '0' }}
      >
        <div className="w-full">
          <div className="flex items-center justify-between px-6 py-[30px] border-b border-b-[#EAE7E6]">
            <h1 className="text-xl text-[#050505] font-medium">Add New Candidate</h1>
            <div
              className="cursor-pointer hover:bg-gray-50 hover:opacity-75 rounded-full"
              onClick={() => setCandidate(false)}
            >
              <IconCancel />
            </div>
          </div>
          <Candidates view="pipeline" candidate={candidate} setCandidate={setCandidate} />
        </div>
      </Drawer>
      <div className="flex items-center justify-end mb-6 w-full h-full">
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            className="!w-[158px] !h-10 !bg-mainColor hover:!opacity-75"
            onClick={() => setCandidate(true)}
          >
            <div className="flex items-center justify-center gap-2 text-sm font-semibold">
              <span>Add candidates</span>
              <PlusOutlined />
            </div>
          </Button>
          <Dropdown menu={{ items: PIPLINE_SORT_ITEMS }} trigger={['click']}>
            <Space className="cursor-pointer py-2">
              <Button type="default" className="!h-10 !border-[#D0D5DD] hover:!opacity-75">
                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#344054]">
                  <span>{sort}</span>
                  <IconFilter />
                </div>
              </Button>
            </Space>
          </Dropdown>
          <Dropdown
            trigger={['click']}
            dropdownRender={() => (
              <div className="w-[180px] p-1" style={contentStyle}>
                {PIPLINE_SETTING_ITEMS.map((item: Option, key: number) => (
                  <p
                    className="text-base text-[#101828] font-medium p-2 flex items-center rounded-md hover:bg-[#0000000a]"
                    key={key}
                  >
                    <Checkbox checked={item.checked} disabled={item.disabled}>
                      {item.label}
                    </Checkbox>
                  </p>
                ))}
              </div>
            )}
          >
            <Space className="cursor-pointer py-2">
              <Button type="default" className="!w-10 !h-10 !border-[#D0D5DD] hover:!opacity-75 !p-0">
                <div className="flex items-center justify-center">
                  <IconSetting />
                </div>
              </Button>
            </Space>
          </Dropdown>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="gap-2 flex w-full h-[calc(100vh-360px)] overflow-auto">
          {WORKFLOW_STAGE_TYPE.map((_, key: number) => (
            <Skeleton active loading={isPipelineInfo} key={key} />
          ))}

          {!isPipelineInfo && (
            <>
              {pipelineData?.map((item: PipelineType, key: number) => (
                <Fragment key={key}>
                  {item.stageName !== 'Sourced' && <PipelineItem item={item} index={key} />}
                </Fragment>
              ))}
            </>
          )}
        </div>
      </DragDropContext>
    </>
  );
}

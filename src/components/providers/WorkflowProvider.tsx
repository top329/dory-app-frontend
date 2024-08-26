'use client';

import { Option } from '@/types/global';
import { ReactNode, createContext, useContext, useState } from 'react';

import { WorkflowDefaultStageType, WorkflowStageModuleType } from '@/types/workflow';

import {
  BookOutlined,
  EditOutlined,
  FileDoneOutlined,
  MailOutlined,
  MessageOutlined,
  PlusOutlined,
  RadiusUprightOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd';

type Context = {
  workflowActionItems: MenuProps['items'];
  stageTimeLimit: Option[];
  stageModule: WorkflowStageModuleType;
  selectStageModule: (stage: WorkflowStageModuleType) => void;
  stageContent: WorkflowDefaultStageType;
  addStageContent: (stages: WorkflowDefaultStageType) => void;
};

const workflowActionItems: MenuProps['items'] = [
  {
    label: (
      <div className="flex items-center gap-2">
        <MailOutlined />
        <p className="text-base text-[#101828]">Send an email</p>
      </div>
    ),
    key: 'Send an email',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <MessageOutlined />
        <p className="text-base text-[#101828]">Add a note</p>
      </div>
    ),
    key: 'Add a note',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <FileDoneOutlined />
        <p className="text-base text-[#101828]">Add task</p>
      </div>
    ),
    key: 'Add task',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <TagOutlined />
        <p className="text-base text-[#101828]">Add tags</p>
      </div>
    ),
    key: 'Add tags',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <RadiusUprightOutlined />
        <p className="text-base text-[#101828]">Evaluation request</p>
      </div>
    ),
    key: 'Evaluation request',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <BookOutlined />
        <p className="text-base text-[#101828]">Add folowers</p>
      </div>
    ),
    key: 'Add folowers',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <PlusOutlined />
        <p className="text-base text-[#101828]">Asign to</p>
      </div>
    ),
    key: 'Asign to',
  },
];

const stageTimeLimit: Option[] = [
  { label: 'No time limit', value: '0' },
  { label: '7 days', value: '7' },
  { label: '14 days', value: '14' },
  { label: '21 days', value: '21' },
  { label: 'Custom', value: 'Custom', icon: <EditOutlined /> },
];

const WorkflowContext = createContext<Context | null>(null);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [stageModule, setStageModule] = useState<WorkflowStageModuleType>({
    applicantStep: {
      show: false,
      stageName: '',
      stageTypeName: 'No type',
      stageTypeColor: '',
      timeLimit: 'No time limit',
      fairEvaluation: '0',
      actions: [],
    },
    activeProcess: {
      show: false,
      stageName: '',
      stageTypeName: 'No type',
      stageTypeColor: '',
      timeLimit: 'No time limit',
      fairEvaluation: '0',
      actions: [],
    },
    hires: { show: false, stageName: '', stageTypeName: 'No type', stageTypeColor: '', timeLimit: 'No time limit', fairEvaluation: '0', actions: [] },
  });
  const [stageContent, setStageContent] = useState<WorkflowDefaultStageType>({
    applicantStep: [],
    activeProcess: [],
    hires: [],
  });

  const selectStageModule = (stage: WorkflowStageModuleType) => {
    setStageModule(stage);
  };

  const addStageContent = (stages: WorkflowDefaultStageType) => {
    setStageContent(stages);
  };

  return (
    <WorkflowContext.Provider value={{ workflowActionItems, stageTimeLimit, stageModule, stageContent, selectStageModule, addStageContent }}>
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow(): Context {
  const context = useContext(WorkflowContext);

  if (context === null) {
    throw new Error('useWorkflow must be used within an WorkflowProvider');
  }

  return context;
}

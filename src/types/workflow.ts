export type WorkflowDefaultStageType = {
  applicantStep?: WorkflowStageType[];
  activeProcess?: WorkflowStageType[];
  hires?: WorkflowStageType[];
};

export type WorkflowStageModuleType = {
  applicantStep?: WorkflowStageType;
  activeProcess?: WorkflowStageType;
  hires?: WorkflowStageType;
};

export type WorkflowStageType = {
  id?: number;
  show?: boolean;
  stageName?: string;
  stageTypeName?: string;
  stageTypeColor?: string;
  timeLimit?: string;
  fairEvaluation?: string;
  actions?: WorkflowActionsType[];
};

export type WorkflowActionsType = {
  sendEmail?: WorkflowActionEmailType[];
  addNote?: WorkflowActionNoteType[];
  addTast?: WorkflowActionTaskType[];
  addTags?: WorkflowActionTagsType[];
  evaluation?: WorkflowActionEvaluationType[];
  addFolowers?: WorkflowActionFollowersType[];
  asignTo?: WorkflowActionAsignType[];
};

export type WorkflowActionEmailType = {
  from?: number;
  subject?: string;
  body?: string;
  placeholders?: [];
};

export type WorkflowActionNoteType = {
  content: string;
};

export type WorkflowActionTaskType = {
  duoDate: string;
  members: { id: number }[];
};

export type WorkflowActionTagsType = {
  tags: { tag: string }[];
};

export type WorkflowActionEvaluationType = {
  form: number;
  members: { id: number }[];
};

export type WorkflowActionFollowersType = {
  members: { id: number }[];
};

export type WorkflowActionAsignType = {};

export type WorkflowResponse = {
  id: number;
  companyId: number;
  pipelineName: string;
  defaultStatus: number;
  pipelineContent: {
    stageKind: string;
    stageList: WorkflowStageType[];
  }[];
};

export const WORKFLOW_STAGE_TYPE = [
  { id: 0, label: 'No type', value: 'No type', color: '' },
  { id: 1, label: 'Apply', value: 'Apply', color: '#EDECEA' },
  { id: 2, label: 'Phone screen', value: 'Phone screen', color: '#726DFF' },
  { id: 3, label: 'Interview', value: 'Interview', color: '#FF7F62' },
  { id: 4, label: 'Evaluation', value: 'Evaluation', color: '#CCE7FD' },
  { id: 5, label: 'Offer', value: 'Offer', color: '#EBB6D2' },
  { id: 6, label: 'Hired', value: 'Hired', color: '#D4FF6F' },
];

import { Option } from './global';
import { WorkflowStageType } from './workflow';

export enum QuestionKindEnum {
  empty = '',
  pre_answer = 'PRE_ANSWER',
  multi_choice = 'MULTI_CHOICE',
  text_box = 'TEXT_BOX',
  scale_answer = 'SCALE_ANSWER',
  upload_portfolio = 'UPLOAD_PORTFOLIO',
}

export enum QuestionTitleEnum {
  empty = '',
  pre_answer = 'Pre-defined answer',
  multi_choice = 'Multiple choice',
  text_box = 'Text box',
  scale_answer = 'Scale answer',
  upload_portfolio = 'Upload CV/portfolio',
}

export type QuestionAddContentType = {
  id?: number;
  kind?: QuestionKindEnum;
  show?: boolean;
  title?: QuestionTitleEnum;
  icon?: React.ReactNode;
  question?: string;
  required?: 'Optional' | 'Required';
  answers?: { answer: string; id: number }[];
};

export type VideoQuestionAddContentType = {
  id?: number;
  show?: boolean;
  title?: string;
  details?: string;
  thinkingTime?: string;
  answerTime?: string;
  totalTakes?: string;
  required?: 'Optional' | 'Required';
};

export type JobInitDataResponse = {
  languages: Option[];
  departments: Option[];
  recruiters: Option[];
  hiringManagers: Option[];
  employeeTypes: Option[];
  categories: Option[];
  workflows: Option[];
  requiredEducations: Option[];
  requiredExperiences: Option[];
  salaryPeriods: Option[];
  currencies: Option[];
  videoQuestions: Option[];
};

export interface NewJobsProps {
  jobId?: string;
  companyId?: string;
  jobTitle?: string;
  jobDepartId?: string;
  recruiterId?: string;
  hiringManagerId?: string;
  openingNumber?: string;
  jobLanguageId?: string;
  jobCountry?: string;
  jobCity?: string;
  remoteStatus?: string;
  jobStatus?: string;
  jobDescription?: string;
  jobRequirement?: string;
  jobEmailInbox?: string;
  employeeTypeId?: string;
  jobCategoryId?: string;
  requiredEducationId?: string;
  requiredExperienceId?: string;
  salaryPeriodId?: string;
  salaryMin?: string;
  salaryMax?: string;
  hourPerWeekMin?: string;
  hourPerWeekMax?: string;
  currencyId?: string;
  nameRequired?: string;
  emailRequired?: string;
  phoneRequired?: string;
  questionContent?: QuestionAddContentType[];
  videoQuestionTitle?: string;
  videoQuestionDescription?: string;
  videoQuestionFile?: File;
  videoQuestionFileUrl?: string;
  videoQuestionTemplateId?: string;
  candidateVideoQuestions?: VideoQuestionAddContentType[];
  jobPipeline?: {
    stageKind: string;
    stageList: WorkflowStageType[];
  }[];
  autoConfirmEmailStatus?: string;
  autoEmailTemplate?: { subject: string; body: string };
  jobUrl?: string;
  jobQRFile?: File;
  jobQRFileUrl?: string;
  jobDeadline?: string;
  jobShareCountry?: string;
  shareKind?: string;
  shareCandidateInfo?: string;
  shareNotificationKind?: string;
  shareNotificationContent?: string;
  inviteEmailSignFile?: File | null;
  inviteEmailSignFileUrl?: string;
  bulkUploadFile?: File | null;
  bulkUploadFileUrl?: string;
  directWeekendUrl?: string;
  checkCareerHub?: boolean;
  checkQuestion?: boolean;
  activeConfirmEmail?: boolean;
}

export type JobDetailResponse = {
  initialData: JobInitDataResponse;
  jobData: NewJobsProps;
};

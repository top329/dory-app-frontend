
import { ListDataResponse } from './global';

export type JobInfoType = {
  jobId: number;
  jobTitle: string;
  jobCountry: string;
  jobCity: string;
  remoteStatus: number;
  archiveStatus: number;
};

export type CandidateParamType = {
  id?: number;
  userId: number;
  companyId: number;
  jobIds: number[];
  fullName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  inviteStatus: number;
  photoFile: File;
  photoNormalUrl?: string;
  cvFile?: File;
  cvFileUrl?: string;
  coverLetterFile?: File;
  coverLetterFileUrl?: string;
  coverLetterText?: string;
};

export type PipelineType = {
  stageName: string;
  stageColor: string;
  candidateCnt: number;
  candidates: CandidatesType[];
  stageId: number;
};

export type CandidatesType = {
  candidateId?: number;
  name?: string;
  photoNormal?: string;
  photoThumb?: string;
  ratingScore?: number;
  job?: string;
  videoStatus?: string;
  stageName?: string;
  stageColor?: string;
  createDate?: string;
  talentPool?: string;
  email?: string;
  appliedDate?: string;
};

export interface CandidatesResponse {
  listInfo: ListDataResponse<CandidatesType[]>;
}

export type PipelineResponse = {
  qualifiedCnt: number;
  disqualifiedCnt: number;
  jobInfo: JobInfoType;
  pipelineContents: PipelineType[];
};

export type CandidateStageParam = {
  userId: number;
  companyId: number;
  candidateId: number;
  jobId: number;
  sourceJobStageId: number;
  destJobStageId: number;
  prevStageName: string;
  nextStageName: string;
  sendEmail: boolean;
  sourceCandidateIds: (number | undefined)[];
  destCandidateIds?: (number | undefined)[];
};

export interface FiltersResponse extends ListDataResponse<CandidatesType[]> {
  jobInfo: JobInfoType;
}

export type JobAnalyticsResponse = {
  jobInfo?: JobInfoType;
  totalCandidateCnt?: number;
  disqualifiedCandidateCnt?: number;
  hiredCandidateCnt?: number;
  hireTime?: number;
  disqualifiedTime?: number;
  candidateOvertime?: {
    label: string[];
    value: number[];
  };
  engagedCandidate?: {
    label: string[];
    value: number[];
  };
  pipelineBreakDown?: {
    label: string[];
    value: number[];
  };
};

export type ActivityType = {
  actionKindId: number;
  kindId: number;
  occurKind: number;
  jobCandidateStatus: number;
  jobId: number;
  candidateId: number;
  userName: string;
  photoNormalUrl: string;
  photoThumbUrl: string;
  title: string;
  content: string;
  createTime: string;
};

export type ActivityResponse = {
  jobInfo: JobInfoType;
  activities: {
    activityDate: string;
    contents: ActivityType[];
  }[];
};

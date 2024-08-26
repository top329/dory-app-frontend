import { ListDataResponse } from './global';

export type DashboardCandidateList = {
  candidateId: number;
  name: string;
  email: string;
  position: string;
  photoNormal: string;
  photoThumb: string;
  averageScore: number;
  jobScore: string;
  createDate: string;
  talentPool: string;
  stageColor: string;
  stageName: string;
};

export interface DashboardResponse {
  companyId: number;
  totalResponseCnt: number;
  weekResponseCnt: number;
  totalCandidateCnt: number;
  weekCandidateCnt: number;
  totalActiveJobCnt: number;
  weekActiveJobCnt: number;
  listInfo: ListDataResponse<DashboardCandidateList[]>;
}

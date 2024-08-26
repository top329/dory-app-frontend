export type JobListType = {
  jobId: number;
  jobTitle: string;
  department: string;
  remoteStatus: number;
  candidates: number;
  jobStatus: number;
  followStatus: number;
};

export type JobListResponse = {
  allJobCnt: number;
  archivedJobCnt: number;
  jobs: JobListType[];
};

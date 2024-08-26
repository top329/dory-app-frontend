import { rootApi } from '../api';
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { ApiResponse } from '@/types/global';
import type { JobListResponse } from '@/types/jobs';
import { JobDetailResponse, JobInitDataResponse, NewJobsProps } from '@/types/new_job';

interface JobsInitialProps {
  jobInit: JobInitDataResponse | null;
  jobList: JobListResponse | null;
  jobData: NewJobsProps | null;
}

const initialState: JobsInitialProps = {
  jobInit: null,
  jobList: null,
  jobData: null,
};

export const jobsApi = rootApi.injectEndpoints({
  endpoints: build => ({
    getJobListData: build.query<ApiResponse<JobListResponse>, { userId: number; companyId: number; kind: number }>({
      query: (arg: { userId: number; companyId: number; kind: number }) => ({
        url: `/job/list/${arg.userId}/${arg.companyId}/${arg.kind}`,
        method: 'GET',
        params: arg,
      }),
      providesTags: ['Jobs'],
    }),
    setJobFollow: build.mutation<ApiResponse<void>, { jobId: number; userId: number }>({
      query: (arg: { jobId: number; userId: number }) => ({
        url: '/job/follow',
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['Jobs'],
    }),
    getJobDetailData: build.query<ApiResponse<JobDetailResponse>, { jobId: number; companyId: number }>({
      query: (arg: { jobId: number; companyId: number }) => `/job/detail/info/${arg.companyId}/${arg.jobId}`,
      providesTags: ['Jobs'],
    }),
    setArchiveJob: build.mutation<ApiResponse<void>, { jobId: number; userId: number; archiveStatus: number }>({
      query: (arg: { jobId: number; userId: number; archiveStatus: number }) => ({
        url: '/job/archive',
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['Jobs'],
    }),
  }),
});

export const jobs = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<JobsInitialProps>) => {
    builder.addMatcher(jobsApi.endpoints.getJobListData.matchFulfilled, (state, action) => {
      state.jobList = action?.payload?.data;
    });
    builder.addMatcher(jobsApi.endpoints.getJobDetailData.matchFulfilled, (state, action) => {
      state.jobInit = action?.payload?.data?.initialData;
      state.jobData = action?.payload?.data?.jobData;
    });
  },
});

export const {
  useGetJobListDataQuery,
  useLazyGetJobListDataQuery,
  useSetJobFollowMutation,
  useGetJobDetailDataQuery,
  useLazyGetJobDetailDataQuery,
  useSetArchiveJobMutation,
} = jobsApi;

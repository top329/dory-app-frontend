import { ActionReducerMapBuilder, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { rootApi } from '../api';
import { type JobInitDataResponse, NewJobsProps, type JobDetailResponse } from '@/types/new_job';
import { ApiResponse } from '@/types/global';
import { WorkflowResponse } from '@/types/workflow';

interface NewJobInitialProps {
  jobInit: JobInitDataResponse | null;
  jobs: NewJobsProps | null;
  prevJobs: NewJobsProps | null;
}

const initialState: NewJobInitialProps = {
  jobInit: null,
  jobs: null,
  prevJobs: null,
};

export const newJobApi = rootApi.injectEndpoints({
  endpoints: build => ({
    getJobInitData: build.query<ApiResponse<JobInitDataResponse>, number>({
      query: (id: number) => `/job/initial/info/${id}`,
      providesTags: ['NewAddJob'],
    }),
    getWorkflowByCompany: build.query<ApiResponse<WorkflowResponse>, number>({
      query: (id: number) => `/job/workflow/${id}`,
      providesTags: ['NewAddJob'],
    }),
    setCreateNewJobs: build.mutation<ApiResponse<void> | unknown, NewJobsProps>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const formData = new FormData();

        formData.append('companyId', _arg.companyId as string);

        if (_arg.jobId) {
          formData.append('jobId', _arg.jobId);
          formData.append('jobTitle', _arg.jobTitle as string);
          formData.append('jobDepartId', _arg.jobDepartId as string);
          formData.append('recruiterId', _arg.recruiterId as string);
          formData.append('hiringManagerId', _arg.hiringManagerId as string);
          formData.append('jobLanguageId', _arg.jobLanguageId as string);

          if (_arg.jobCountry) {
            formData.append('jobCountry', _arg.jobCountry as string);
            formData.append('jobCity', _arg.jobCity as string);
            formData.append('jobRequirement', _arg.jobRequirement as string);
          }

          formData.append('remoteStatus', _arg.remoteStatus as string);
          formData.append('jobDescription', _arg.jobDescription as string);

          if (_arg.jobDeadline) {
            formData.append('jobDeadline', _arg.jobDeadline as string);
            formData.append('jobShareCountry', _arg.jobShareCountry as string);
          }

          if (_arg.shareKind) {
            formData.append('shareKind', _arg.shareKind as string);
            formData.append('shareCandidateInfo', _arg.shareCandidateInfo as string);
            formData.append('shareNotificationKind', _arg.shareNotificationKind as string);
            formData.append('shareNotificationContent', _arg.shareNotificationContent as string);

            if (_arg.inviteEmailSignFile) {
              formData.append('inviteEmailSignFile', _arg.inviteEmailSignFile as File);
            }

            if (_arg.bulkUploadFile) {
              formData.append('bulkUploadFile', _arg.bulkUploadFile as File);
            }
          }
        } else {
          formData.append('jobTitle', _arg.jobTitle as string);
          formData.append('jobDepartId', _arg.jobDepartId as string);
          formData.append('recruiterId', _arg.recruiterId as string);
          formData.append('hiringManagerId', _arg.hiringManagerId as string);
          formData.append('jobLanguageId', _arg.jobLanguageId as string);

          if (_arg.jobCountry) {
            formData.append('jobCountry', _arg.jobCountry as string);
            formData.append('jobCity', _arg.jobCity as string);
            formData.append('jobRequirement', _arg.jobRequirement as string);
          }

          formData.append('remoteStatus', _arg.remoteStatus as string);
          formData.append('jobDescription', _arg.jobDescription as string);
          formData.append('employeeTypeId', _arg.employeeTypeId as string);
          formData.append('jobCategoryId', _arg.jobCategoryId as string);
          formData.append('requiredEducationId', _arg.requiredEducationId as string);
          formData.append('salaryPeriodId', _arg.salaryPeriodId as string);
          formData.append('salaryMin', _arg.salaryMin as string);
          formData.append('salaryMax', _arg.salaryMax as string);
          formData.append('currencyId', _arg.currencyId as string);
          formData.append('nameRequired', _arg.nameRequired as string);
          formData.append('emailRequired', _arg.emailRequired as string);
          formData.append('phoneRequired', _arg.phoneRequired as string);
          formData.append('questionContent', JSON.stringify(_arg.questionContent));
          formData.append('videoQuestionTitle', _arg.videoQuestionTitle as string);
          formData.append('videoQuestionDescription', _arg.videoQuestionDescription as string);
          formData.append('videoQuestionFile', _arg.videoQuestionFile as File);
          formData.append('candidateVideoQuestions', JSON.stringify(_arg.candidateVideoQuestions));
          formData.append('jobPipeline', JSON.stringify(_arg.jobPipeline));
          formData.append('autoConfirmEmailStatus', _arg.autoConfirmEmailStatus as string);

          if (_arg.autoEmailTemplate) {
            formData.append('autoEmailTemplate', JSON.stringify(_arg.autoEmailTemplate));
          }
        }

        // formData.append('jobStatus', _arg.jobStatus as string);
        // formData.append('hourPerWeekMin', _arg.hourPerWeekMin as string);
        // formData.append('hourPerWeekMax', _arg.hourPerWeekMax as string);
        // formData.append('requiredExperienceId', _arg.requiredExperienceId as string);
        // formData.append('jobEmailInbox', _arg.jobEmailInbox as string);
        // formData.append('openingNumber', _arg.openingNumber as string);
        // formData.append('jobUrl', _arg.jobUrl as string);
        // formData.append('jobQRFile', _arg.jobQRFile as File);
        // formData.append('directWeekendUrl', _arg.directWeekendUrl as string);

        const response = await fetchWithBQ({
          method: 'POST',
          url: '/job/save',
          body: formData,
        });

        return response;
      },
      invalidatesTags: () => [{ type: 'NewAddJob' }],
    }),
  }),
});

export const newJob = createSlice({
  name: 'newJob',
  initialState,
  reducers: {
    setNewJobData: (state, action: PayloadAction<NewJobsProps>) => {
      state.jobs = action.payload;
    },
    setPreviewJobData: (state, action: PayloadAction<NewJobsProps>) => {
      state.prevJobs = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<NewJobInitialProps>) => {
    builder.addMatcher(newJobApi.endpoints.getJobInitData.matchFulfilled, (state, action) => {
      state.jobInit = action?.payload?.data;
    });
  },
});

export const { setNewJobData, setPreviewJobData } = newJob.actions;
export const {
  useGetJobInitDataQuery,
  useLazyGetWorkflowByCompanyQuery,
  useGetWorkflowByCompanyQuery,
  useSetCreateNewJobsMutation,
} = newJobApi;

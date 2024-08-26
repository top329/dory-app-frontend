import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { rootApi } from '../api';
import { ApiResponse, Option } from '@/types/global';
import { CandidateOverviewResponse } from '@/types/detail_candidate';

interface DetailCandidateInitialProps {
    candidateOverview: CandidateOverviewResponse | null;
}
  
  const initialState: DetailCandidateInitialProps = {
    candidateOverview: null,
};

export const detailCandidateApi = rootApi.injectEndpoints({
    endpoints: build => ({
        getCandidateOverview: build.query<ApiResponse<CandidateOverviewResponse>, {candidateId: number}>({
            query: (arg: {candidateId: number}) => ({
                url: `/candidate/detail/overview/${arg.candidateId}`,
                method: "GET",
            }),
            providesTags: ['DetailCandidate'],
        })
    })
});

export const detailCandidate = createSlice({
    name: 'deatail_candidate',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<DetailCandidateInitialProps>) => {
        builder.addMatcher(detailCandidateApi.endpoints.getCandidateOverview.matchFulfilled, (state, action) => {
            state.candidateOverview = action?.payload?.data;
        });
    },
});

export const { useGetCandidateOverviewQuery, useLazyGetCandidateOverviewQuery} = detailCandidateApi;
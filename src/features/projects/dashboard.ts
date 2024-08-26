import { ApiResponse } from '@/types/global';
import { rootApi } from '../api';
import { DashboardResponse } from '@/types/dashboard';
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

interface DashboardProps {
  dashboard: DashboardResponse | null;
}

const initialState: DashboardProps = {
  dashboard: null,
};

export const dashboardApi = rootApi.injectEndpoints({
  endpoints: build => ({
    getDashboardData: build.query<
      ApiResponse<DashboardResponse>,
      {
        userId: number;
        companyId: number;
        pageNumber: number;
        pageSize: number;
        sortItem: string;
        sortDirect: number;
      }
    >({
      query: (arg: {
        userId: number;
        companyId: number;
        pageNumber: number;
        pageSize: number;
        sortItem: string;
        sortDirect: number;
      }) => ({
        url: '/user/dashboard',
        method: 'GET',
        params: arg,
      }),
      providesTags: ['Dashboard'],
    }),
  }),
});

export const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DashboardProps>) => {
    builder.addMatcher(dashboardApi.endpoints.getDashboardData.matchFulfilled, (state, action) => {
      state.dashboard = action?.payload?.data;
    });
  },
}).reducer;

export const { useGetDashboardDataQuery, useLazyGetDashboardDataQuery } = dashboardApi;

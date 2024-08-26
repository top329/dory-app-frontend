import { message } from 'antd';
import { ApiResponse } from '@/types/global';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi = createApi({
  reducerPath: 'rootApi',
  tagTypes: ['Auth', 'Dashboard', 'NewAddJob', 'Jobs', 'Candidate', 'DetailCandidate'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers: Headers) => {
      const accessToken = typeof window !== 'undefined' && window.sessionStorage.getItem('accessToken');

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
    responseHandler: async (response: Response) => {
      const res = (await response.json()) as ApiResponse<unknown>;
      if (res.code !== 200) {
        message.error(res.msg);
        throw new Error(res.msg);
      }

      if (res.token && res.token !== '') {
        typeof window !== 'undefined' && window.sessionStorage.setItem('accessToken', res.token);
        typeof window !== 'undefined' && window.sessionStorage.setItem('expireDate', res.expireDate.toString());
      }

      return res;
    },
  }),
  endpoints: () => ({}),
});

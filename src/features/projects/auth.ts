import { ActionReducerMapBuilder, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { rootApi } from '../api';
import { SignupProps, UserProps, UserResponse } from '@/types/auth';
import { ApiResponse, LanguageType } from '@/types/global';

interface AuthInitialProps {
  member: UserResponse | null;
  signup: SignupProps | null;
}

const initialState: AuthInitialProps = {
  member: null,
  signup: null,
};

export const authApi = rootApi.injectEndpoints({
  endpoints: build => ({
    setRequestLogin: build.mutation<ApiResponse<void>, UserProps>({
      query: LoginProps => ({
        url: '/auth/signin',
        method: 'POST',
        body: LoginProps,
      }),
      invalidatesTags: ['Auth'],
    }),
    setFinishLogin: build.mutation<ApiResponse<UserResponse>, { authKey: string; otp: number }>({
      query: (arg: { authKey: string; otp: number }) => ({
        url: '/auth/signin/verify/otp',
        method: 'POST',
        body: { authKey: arg.authKey, otp: arg.otp },
      }),
      invalidatesTags: ['Auth'],
    }),
    setVerifyCodeRequest: build.mutation<ApiResponse<void>, { authKey: string }>({
      query: (arg: { authKey: string }) => ({
        url: '/auth/req/otp',
        method: 'POST',
        body: { authKey: arg.authKey },
      }),
      invalidatesTags: ['Auth'],
    }),
    setVerifyCode: build.mutation<ApiResponse<void>, { authKey: string; otp: number }>({
      query: (arg: { authKey: string; otp: number }) => ({
        url: '/auth/verify/otp',
        method: 'POST',
        body: { authKey: arg.authKey, otp: arg.otp },
      }),
      invalidatesTags: ['Auth'],
    }),
    setSignUp: build.mutation<ApiResponse<UserResponse> | any, SignupProps>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const formData = new FormData();

        formData.append('firstName', _arg.firstName as string);
        formData.append('lastName', _arg.lastName as string);
        formData.append('email', _arg.email as string);
        formData.append('phoneNumber', _arg.phoneNumber as string);
        formData.append('password', _arg.password as string);
        formData.append('phrase', _arg.phrase as string);
        formData.append('languageCode', _arg.languageCode as string);
        formData.append('languageName', _arg.languageName as string);
        formData.append('weekStartDayKey', _arg.weekStartDayKey as string);
        formData.append('weekStartDayValue', _arg.weekStartDayValue as string);
        formData.append('countryKey', _arg.countryKey as string);
        formData.append('countryValue', _arg.countryValue as string);
        formData.append('timezoneKey', _arg.timezoneKey as string);
        formData.append('timezoneValue', _arg.timezoneValue as string);
        formData.append('employeesKey', _arg.employeesKey as string);
        formData.append('employeesValue', _arg.employeesValue as string);
        formData.append('companyName', _arg.companyName as string);
        formData.append('primaryColor', _arg.primaryColor as string);
        formData.append('secondaryColor', _arg.secondaryColor as string);
        formData.append('companyLogoFile', _arg.companyLogoFile as File);
        formData.append('doryUseKind', _arg.doryUseKind as string);

        const response = await fetchWithBQ({
          method: 'POST',
          url: '/auth/signup',
          body: formData,
        });

        return response;
      },
      invalidatesTags: ['Auth'],
    }),
    checkEmailPhone: build.mutation<ApiResponse<void>, { authKey: string; kind: number }>({
      query: (arg: { authKey: string; kind: number }) => ({
        url: '/auth/check/emailphone',
        method: 'POST',
        body: { authKey: arg.authKey, kind: arg.kind },
      }),
      invalidatesTags: ['Auth'],
    }),
    getDefaultLanguage: build.query<ApiResponse<LanguageType[]>, { sword: string; kind: number }>({
      query: (arg: { sword: string; kind: number }) => ({
        url: `/lang/initial/support/list?authKey=${arg.sword}&kind=${arg.kind}`,
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
  }),
});

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignupData: (state, action: PayloadAction<SignupProps>) => {
      state.signup = action.payload;
    },
    logout: () => {
      typeof window !== 'undefined' && window.sessionStorage.clear();
      typeof window !== 'undefined' && window.localStorage.clear();
      typeof window !== 'undefined' && window.location.replace('/login');
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthInitialProps>) => {
    builder.addMatcher(authApi.endpoints.setFinishLogin.matchFulfilled, (state, action) => {
      state.member = action?.payload?.data;
    });
  },
});

export const { setSignupData, logout } = auth.actions;
export const {
  useSetRequestLoginMutation,
  useSetFinishLoginMutation,
  useSetSignUpMutation,
  useSetVerifyCodeMutation,
  useSetVerifyCodeRequestMutation,
  useCheckEmailPhoneMutation,
  useGetDefaultLanguageQuery,
} = authApi;

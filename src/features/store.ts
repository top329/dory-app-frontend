import { configureStore } from '@reduxjs/toolkit';
import { rootApi } from './api';
import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { rtkQueryLoadingHandler } from './middleware';
import app from './app';
import { auth, dashboard, newJob, jobs, candidate, detailCandidate } from './projects';

const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    app: app.reducer,
    auth: auth.reducer,
    newJob: newJob.reducer,
    dashboard,
    jobs: jobs.reducer,
    candidate: candidate.reducer,
    detailCandidate: detailCandidate.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(rootApi.middleware)
      .concat(rtkQueryLoadingHandler),//format
});

export default store;
export const { dispatch } = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof dispatch;
export const useDispatch: () => AppDispatch = useAppDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

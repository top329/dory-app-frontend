import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadingApp: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const appActions = app.actions;

export default app;

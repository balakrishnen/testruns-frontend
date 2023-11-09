// assetsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const runsSlice = createSlice({
  name: 'runs',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchRunsStart: (state) => {
      state.loading = true;
    },
    fetchRunsSuccess: (state, action) => {
        console.log("action.payload",action.payload)
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchRunsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRunsStart,
  fetchRunsSuccess,
  fetchRunsFailure,
} = runsSlice.actions;

export default runsSlice.reducer;

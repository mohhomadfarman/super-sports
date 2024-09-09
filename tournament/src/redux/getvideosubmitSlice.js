import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstanceToken } from './instence';

// Fetch video by userId
export const Getvideosubmit = createAsyncThunk('Getvideosubmit', async ( userId ) => {
  const response = await axiosInstanceToken.get(`/contest/${userId}`);
  return response.data;
});

const getvideosubmitSlice = createSlice({
  name: 'videosubmit',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Getvideosubmit.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(Getvideosubmit.fulfilled, (state, action) => {
        state.status = 'successded';
        state.items = action.payload;
      })
      .addCase(Getvideosubmit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default getvideosubmitSlice.reducer;

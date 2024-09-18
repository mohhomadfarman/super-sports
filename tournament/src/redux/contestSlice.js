import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstanceToken, axiosInstanceTokenFormData } from './instence';

// Async thunk for API call
export const GetContests = createAsyncThunk('GetContests', async () => {
  const response = await axiosInstanceToken.get('/contests');
  return response.data;
});

export const GetHomeContests = createAsyncThunk('GetHomeContests', async () => {
  const response = await axiosInstanceToken.get('/contests/home-contests');
  return response.data;
});

// Async thunk for API call
export const GetSingleContests = createAsyncThunk('GetSingleContests', async (id) => {
  const response = await axiosInstanceToken.get(`/contests/single/${id}`);
  return response.data;
});


// Async thunk for API call
export const GetJoinedContest = createAsyncThunk('GetJoinedContest', async (id) => {
  const response = await axiosInstanceToken.get(`/contest/${id}`);
  return response.data;
});
export const createContests = createAsyncThunk('createContests', async (payload) => {
  const response = await axiosInstanceTokenFormData.post('/contests',payload);
  return response.data;
});

// Async thunk for API call
export const deleteContest = createAsyncThunk('deleteContest', async (id) => {
  const response = await axiosInstanceToken.delete(`/contests/${id}`);
  return response.data;
});
// Async thunk for API call
export const UpdateContests = createAsyncThunk('UpdateContest', async (id) => {
  const response = await axiosInstanceTokenFormData.post(`/contests/${id}`);
  return response.data;
});

// Async thunk for API call
export const joinContest = createAsyncThunk('joinContest', async (payload) => {
  const response = await axiosInstanceTokenFormData.post(`/contest/join/${payload.id}`,payload.submission);
  return response.data;
});


// Slice definition
const contestSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetContests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetContests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(GetContests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default contestSlice.reducer;

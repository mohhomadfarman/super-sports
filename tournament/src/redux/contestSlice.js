import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstanceToken, axiosInstanceTokenFormData } from './instence';

// Async thunk for API call
export const GetContests = createAsyncThunk('GetContests', async () => {
  const response = await axiosInstanceToken.get('/contests');
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

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstanceToken, axiosInstanceTokenFormData } from './instence';

export const GetContests = createAsyncThunk('GetContests', async () => {
  const response = await axiosInstanceToken.get('/contests');
  return response.data;
});

export const GetHomeContests = createAsyncThunk('GetHomeContests', async () => {
  const response = await axiosInstanceToken.get('/contests/home-contests');
  return response.data;
});

export const GetSingleContests = createAsyncThunk('GetSingleContests', async (id) => {
  const response = await axiosInstanceToken.get(`/contests/single/${id}`);
  return response.data;
});

export const GetHomeSingleContests = createAsyncThunk('GetHomeSingleContests', async (id) => {
  const response = await axiosInstanceToken.get(`/contests/home-single/${id}`);
  return response.data;
});

export const GetJoinedContest = createAsyncThunk('GetJoinedContest', async (id) => {
  const response = await axiosInstanceToken.get(`/contest/${id}`);
  return response.data;
});

export const createContests = createAsyncThunk('createContests', async (payload) => {
  const response = await axiosInstanceTokenFormData.post('/contests', payload);
  return response.data;
});

export const deleteContest = createAsyncThunk('deleteContest', async (id) => {
  const response = await axiosInstanceToken.delete(`/contests/${id}`);
  return response.data;
});

export const UpdateContests = createAsyncThunk('UpdateContests', async ({ id, data }) => {
  const response = await axiosInstanceTokenFormData.put(`/contests/${id}`, data);
  return response.data;
});

export const joinContest = createAsyncThunk('joinContest', async (payload) => {
  const response = await axiosInstanceTokenFormData.post(`/contest/join/${payload.id}`, payload.submission);
  return response.data;
});

// Slice definition
const contestSlice = createSlice({
  name: 'contest',
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
      })
      .addCase(createContests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createContests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload); 
      })
      .addCase(createContests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteContest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteContest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((item) => item._id !== action.payload._id); 
      })
      .addCase(deleteContest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(UpdateContests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateContests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ); 
      })
      .addCase(UpdateContests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(joinContest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(joinContest.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(joinContest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default contestSlice.reducer;

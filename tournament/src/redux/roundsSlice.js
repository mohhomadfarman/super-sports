import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstanceToken } from './instence';

// Async thunk for API call
export const getContestRounds = createAsyncThunk('getContestRounds', async (id) => {
  const response = await axiosInstanceToken.get(`/rounds/${id}`);
  return response.data;
});

// Async thunk for API call
export const GetSubRounds = createAsyncThunk('GetSubRounds', async (payload) => {
  const response = await axiosInstanceToken.get(`/rounds/subrounds/${payload}`);
  return response.data;
});



// Async thunk for API call
export const createRounds = createAsyncThunk('createRounds', async (payload) => {
  const response = await axiosInstanceToken.post(`/rounds`,payload);
  return response.data;
});




// Slice definition
const roundsSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContestRounds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getContestRounds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getContestRounds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default roundsSlice.reducer;

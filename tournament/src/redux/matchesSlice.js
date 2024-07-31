import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstanceToken, axiosInstanceTokenFormData } from './instence';

// Async thunk for API call
export const Getmatches = createAsyncThunk('Getmatches', async () => {
  const response = await axiosInstanceToken.get('/matches');
  return response.data;
});

export const CreateMatches = createAsyncThunk('CreateMatches', async (payload) => {
  const response = await axiosInstanceTokenFormData.post('/matches',payload);
  return response.data;
});


// Async thunk for API call
export const deleteMatch = createAsyncThunk('deleteMatch', async (id) => {
  const response = await axiosInstanceToken.delete(`/matches/${id}`);
  return response.data;
});
// Async thunk for API call
export const UpdateMatch = createAsyncThunk('UpdateMatch', async (id) => {
  const response = await axiosInstanceTokenFormData.post(`/matches/${id}`);
  return response.data;
});

// Slice definition
const matchesSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Getmatches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(Getmatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(Getmatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default matchesSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from './instence';

// Async thunk for API call
export const login = createAsyncThunk('data/fetchData', async (payload) => {
  const response = await axiosInstance.post('/auth/login',payload);
  return response.data;
});

// Slice definition
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;

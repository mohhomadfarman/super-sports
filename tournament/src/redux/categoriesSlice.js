import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {axiosInstanceToken } from './instence';

// Async thunk for API call
export const GetCategories = createAsyncThunk('GetCategories', async () => {
  const response = await axiosInstanceToken.get('/categories');
  return response.data;
});
export const createCategories = createAsyncThunk('createCategories', async (payload) => {
  const response = await axiosInstanceToken.post('/categories',payload);
  return response.data;
});


// Async thunk for API call
export const deleteCategories = createAsyncThunk('deleteCategories', async (id) => {
  const response = await axiosInstanceToken.delete(`/categories/${id}`);
  return response.data;
});
// Async thunk for API call
export const UpdateCategories = createAsyncThunk('UpdateCategories', async (id) => {
  const response = await axiosInstanceToken.post(`/categories/${id}`);
  return response.data;
});


// Slice definition
const categoriesSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(GetCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;

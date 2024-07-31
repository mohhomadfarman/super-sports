import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstanceToken, axiosInstanceTokenFormData } from './instence';

// Async thunk for API call
export const GetCities = createAsyncThunk('GetCities', async () => {
  const response = await axiosInstanceToken.get('/cities');
  return response.data;
});
export const createRegion = createAsyncThunk('createRegion', async (payload) => {
  const response = await axiosInstanceToken.post('/cities',payload);
  return response.data;
});

// Async thunk for API call
export const deleteRegion = createAsyncThunk('deleteRegion', async (id) => {
  const response = await axiosInstanceToken.delete(`/cities/${id}`);
  return response.data;
});
// Async thunk for API call
export const UpdateRegion = createAsyncThunk('UpdateRegion', async (id) => {
  const response = await axiosInstanceToken.post(`/cities/${id}`);
  return response.data;
});


// Slice definition
const citiesSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetCities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetCities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(GetCities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default citiesSlice.reducer;

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

// export const UpdateRounds = createAsyncThunk('UpdateRounds', async ({ id, form }) => {
//   const response = await axiosInstanceTokenFormData.put(`/rounds/${id}`,form);
//   return response.data;
// });
export const UpdateRounds = createAsyncThunk('UpdateRounds', async ({ id, form }, { rejectWithValue }) => {
  try {
    const response = await axiosInstanceToken.put(`/rounds/${id}`, form);
    return response.data;
  } catch (error) {
    console.error('Failed to update rounds:', error);
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});


export const deleteRounds = createAsyncThunk('deleteRounds', async (id) => {
  try {
    await axiosInstanceToken.delete(`/rounds/${id}`);
    return id; // Return the ID of the deleted round
  } catch (error) {
    console.error('Failed to delete rounds:', error);
    throw error;
  }
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
      })
      .addCase(UpdateRounds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateRounds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update items with the new data if needed
      })
      .addCase(UpdateRounds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteRounds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteRounds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted round from the items list
        state.items = state.items.filter((round) => round._id !== action.payload);
      })
      .addCase(deleteRounds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default roundsSlice.reducer;

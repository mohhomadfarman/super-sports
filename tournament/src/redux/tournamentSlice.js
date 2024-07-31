import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstanceToken, axiosInstanceTokenFormData } from './instence';

// Async thunk for API call
export const GetTournamets = createAsyncThunk('GetTournamets', async () => {
  const response = await axiosInstanceToken.get('/tournaments');
  return response.data;
});
// Async thunk for API call
export const deleteTournaments = createAsyncThunk('deleteTournaments', async (id) => {
  const response = await axiosInstanceToken.delete(`/tournaments/${id}`);
  return response.data;
});
// Async thunk for API call
export const UpdateTournament = createAsyncThunk('UpdateTournament', async (id) => {
  const response = await axiosInstanceTokenFormData.post(`/tournaments/${id}`);
  return response.data;
});


// Async thunk for API call
export const CreateTournament = createAsyncThunk('CreateTournament', async (payload) => {
  const response = await axiosInstanceTokenFormData.post('/tournaments',payload);
  return response.data;
});



// Slice definition
const tournamentSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetTournamets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetTournamets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(GetTournamets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default tournamentSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstanceToken } from './instence';

// Async thunk for getting the leaderboard
export const GetLeaderBoard = createAsyncThunk('GetLeaderBoard', async () => {
    const response = await axiosInstanceToken.get('/getleaderboard');
    return response.data;
});

// Async thunk for creating a leaderboard entry
export const createLeaderBoard = createAsyncThunk('createLeaderBoard', async (payload) => {
    const response = await axiosInstanceToken.post(`/leaderboard/${payload.id}`, payload.item);
    return response.data;
});

export const getLeaderboardByUserId = createAsyncThunk(
    'leaderboard/getByUserId',
    async (userId) => {
        const response = await axiosInstanceToken.get(`/leaderboard/single/leaderboard/${userId}`);
        return response.data;
    }
);

// Thunk to update a leaderboard entry
export const updateLeaderboardByUserId = createAsyncThunk(
    'leaderboard/updateByUserId', async (payload) => {
      const response = await axiosInstanceToken.put(`/leaderboard/update/${payload?.id}`,payload?.item);
      return response.data;
    }
  );

// Slice definition
const createLeaderBoardSlice = createSlice({
    name: 'leaderboard',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetLeaderBoard.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(GetLeaderBoard.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(GetLeaderBoard.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default createLeaderBoardSlice.reducer;

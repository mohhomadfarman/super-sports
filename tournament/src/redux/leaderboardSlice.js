import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstanceToken, axiosInstanceTokenFormData } from './instence';

// Async thunk for getting the leaderboard
export const GetLeaderBoard = createAsyncThunk('GetLeaderBoard', async () => {
    const response = await axiosInstanceToken.get('/getleaderboard');
    return response.data;
});

// Async thunk for getting a single leaderboard entry
export const GetSingleLeaderBoard = createAsyncThunk('GetSingleLeaderBoard', async (userId) => {
    const response = await axiosInstanceToken.get(`/leaderboard/single/${userId}`);
    return response.data;
});

// Async thunk for creating a leaderboard entry
export const createLeaderBoard = createAsyncThunk('createLeaderBoard', async (payload) => {
    const response = await axiosInstanceToken.post(`/leaderboard/${payload.id}`, payload.item);
    return response.data;
});

// Async thunk for deleting a leaderboard entry
export const deleteLeaderboard = createAsyncThunk('deleteLeaderboard', async (userId) => {
    const response = await axiosInstanceToken.delete(`/leaderboard/${userId}`);
    return response.data;
});

// Async thunk for updating a leaderboard entry
export const updateLeaderboard = createAsyncThunk('updateLeaderboard', async (payload) => {
    const { userId, item } = payload;
    const response = await axiosInstanceTokenFormData.post(`/leaderboard/${userId}`, item);
    return response.data;
});

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

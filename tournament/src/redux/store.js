import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import tournamentSliceReducer  from './tournamentSlice';
import matchesSliceReducer from './matchesSlice';
import contestSliceReducer from './contestSlice';
import citiesSliceReducer from './citiesSlice';
import categoriesSliceReducer from './categoriesSlice'
import roundsSliceReducer from './roundsSlice'


const store = configureStore({
  reducer: {
    data: dataReducer,
    GetTournamet: tournamentSliceReducer,
    GetMatches:matchesSliceReducer,
    GetContest: contestSliceReducer,
    GetCities: citiesSliceReducer,
    GetCategories: categoriesSliceReducer,
    getContestRounds: roundsSliceReducer,
  },
});

export default store;

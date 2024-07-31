import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import tournamentSliceReducer  from './tournamentSlice';
import matchesSliceReducer from './matchesSlice';
import contestSliceReducer from './contestSlice';
import citiesSliceReducer from './citiesSlice';
import categoriesSliceReducer from './categoriesSlice'


const store = configureStore({
  reducer: {
    data: dataReducer,
    GetTournamet: tournamentSliceReducer,
    GetMatches:matchesSliceReducer,
    GetContest: contestSliceReducer,
    GetCities: citiesSliceReducer,
    GetCategories: categoriesSliceReducer
  },
});

export default store;

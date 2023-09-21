import { combineReducers } from '@reduxjs/toolkit';
import { coursesSlice } from 'features/courses_list/store';

export const rootReducer = combineReducers({
    courses: coursesSlice.reducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

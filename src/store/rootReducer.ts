import { combineReducers } from '@reduxjs/toolkit';
import { courseDrawerSlice } from 'features/course_details/features/notes_drawer/store';
import { sortTopicsSlice } from 'features/course_details/features/topics_table/store';
import { courseSlice } from 'features/course_details/store';
import { coursesSlice } from 'features/courses_list/store';
import { loginSlice } from 'features/auth/store/login';

export const rootReducer = combineReducers({
    courses: coursesSlice.reducer,
    course: courseSlice.reducer,
    course_drawer: courseDrawerSlice.reducer,
    sort_topics: sortTopicsSlice.reducer,
    login: loginSlice.reducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

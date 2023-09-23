import { combineReducers } from '@reduxjs/toolkit';
import { courseDrawerSlice } from 'features/course_details/features/notes_drawer/store';
import { sortTopicsSlice } from 'features/course_details/features/topics_table/store';
import { courseSlice } from 'features/course_details/store';
import { coursesSlice } from 'features/courses_list/store';
import { loginSlice } from 'features/auth/store/login';
import { notesSlice } from 'features/course_details/features/notes_drawer/notes_list/store';
import { notesInputSlice } from 'features/course_details/features/notes_drawer/notes_input/store';

export const rootReducer = combineReducers({
    courses: coursesSlice.reducer,
    course: courseSlice.reducer,
    course_drawer: courseDrawerSlice.reducer,
    sort_topics: sortTopicsSlice.reducer,
    login: loginSlice.reducer,
    notes: notesSlice.reducer,
    notes_input: notesInputSlice.reducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

import { combineReducers } from '@reduxjs/toolkit';
import { courseDrawerSlice } from 'features/course_details/features/notes_drawer/store';
import { sortTopicsSlice } from 'features/course_details/features/topics_table/store';
import { courseSlice } from 'features/course_details/store';
import { coursesSlice } from 'features/courses_list/store';
import { authSlice } from 'features/login_form/store/login';
import { notesInputSlice } from 'features/course_details/features/notes_drawer/features/notes_input/store';
import { notesSlice } from 'features/course_details/features/notes_drawer/features/notes_list/store';

export const rootReducer = combineReducers({
    courses: coursesSlice.reducer,
    course: courseSlice.reducer,
    course_drawer: courseDrawerSlice.reducer,
    sort_topics: sortTopicsSlice.reducer,
    auth: authSlice.reducer,
    notes: notesSlice.reducer,
    notes_input: notesInputSlice.reducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

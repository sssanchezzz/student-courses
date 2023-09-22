import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Course } from 'types/course';
import { call, put, takeEvery } from 'redux-saga/effects';
import { APIResponse } from 'services/api_request';
import coursesService from 'services/courses_service';
type CoursesState = {
    courses: Course[];
    isLoading: boolean;
    selectedCourseId: null | string;
};

const initialState: CoursesState = {
    courses: [],
    isLoading: false,
    selectedCourseId: null,
};

// actions

export const fetchCourses = createAction('FETCH_COURSES', (userId: string) => ({
    payload: { userId },
}));

export const fetchCoursesSucceeded = createAction(
    'FETCH_COURSES_SUCCEEDED',
    (courses: Course[]) => ({ payload: { courses } })
);

export const fetchCoursesFailed = createAction('FETCH_COURSES_FAILED');

// selectors

export const getCourses = (state: RootState) => state.courses.courses;

export const getCoursesLoading = (state: RootState) => state.courses.isLoading;

export const getCourseTopics = (state: RootState) => {
    if (state.courses.courses.length > 0 && state.courses.selectedCourseId) {
        const course = state.courses.courses.find(
            (course) => course.id === state.courses.selectedCourseId
        );
        return course ? course.topics : [];
    }
};

// reducer

const coursesReducer = (builder: ActionReducerMapBuilder<CoursesState>) => {
    builder
        .addCase(fetchCourses, (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        })
        .addCase(fetchCoursesSucceeded, (state, action) => {
            return {
                ...state,
                isLoading: false,
                courses: action.payload.courses,
            };
        })
        .addCase(fetchCoursesFailed, (state, action) => {
            return initialState;
        });
};

// saga

export function* coursesSaga() {
    yield takeEvery(
        fetchCourses.type,
        function* (action: ReturnType<typeof fetchCourses>): Generator {
            try {
                const response = yield call([
                    coursesService,
                    coursesService.getAll,
                ]);

                const data = (response as APIResponse).data;
                yield put({
                    type: fetchCoursesSucceeded.type,
                    payload: { courses: data },
                });
            } catch (err) {
                yield put({ type: fetchCoursesFailed.type });
            }
        }
    );
}

// slice

export const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: coursesReducer,
});

// slice

import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Course } from 'types/course';
import { call, put, takeEvery } from 'redux-saga/effects';
import coursesService from 'services/courses_service';

type CourseState = {
    course: Course | null;
    courseId: string | null;
    isLoading: boolean;
};

const initialState: CourseState = {
    course: null,
    courseId: null,
    isLoading: false,
};

// actions

export const fetchCourse = createAction('FETCH_COURSE', (courseId: string) => ({
    payload: {
        courseId,
    },
}));

export const fetchCourseSucceeded = createAction(
    'FETCH_COURSE_SUCCEEDED',
    (course: Course) => ({ payload: { course } })
);

export const fetchCourseFailed = createAction('FETCH_COURSE_FAILED');

// selectors

export const getCourse = (state: RootState) => state.course.course;

export const getCourseId = (state: RootState) => state.course.courseId;

export const getCourseLoading = (state: RootState) => state.course.isLoading;

export const getCourseTopics = (state: RootState) => {
    if (state.courses.courses.length > 0 && state.course.courseId) {
        const course = state.courses.courses.find(
            (course) => course.id === state.courses.selectedCourseId
        );
        return course ? course.topics : [];
    }
};

// reducer

const courseReducer = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(fetchCourse, (state, action) => {
            return {
                ...state,
                isLoading: true,
                courseId: action.payload.courseId,
            };
        })
        .addCase(fetchCourseSucceeded, (state, action) => {
            return {
                ...state,
                isLoading: false,
                course: action.payload.course,
            };
        })
        .addCase(fetchCourseFailed, (action, payload) => {
            return initialState;
        });
};

// saga

export function* courseSaga() {
    yield takeEvery(
        fetchCourse.type,
        function* (action: ReturnType<typeof fetchCourse>): Generator {
            try {
                const course = yield call(
                    [coursesService, coursesService.getById],
                    action.payload.courseId
                );

                yield put({
                    type: fetchCourseSucceeded.type,
                    payload: { course },
                });
            } catch (err) {
                yield put({ type: fetchCourseFailed.type });
            }
        }
    );
}

// slice

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: courseReducer,
});

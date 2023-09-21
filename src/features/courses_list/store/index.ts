import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Course } from 'types/course';
import { call, put, takeEvery } from 'redux-saga/effects';
import { APIRequest, APIResponse } from 'services/api_request';
type CoursesState = {
    courses: Course[];
    isLoading: boolean;
};

const initialState: CoursesState = {
    courses: [],
    isLoading: false,
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

// request

async function getCoursesRequest(userId: string): Promise<APIResponse> {
    try {
        const response = await APIRequest.get(`/courses/${userId}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

// saga

export function* coursesSaga() {
    yield takeEvery(
        fetchCourses.type,
        function* (action: ReturnType<typeof fetchCourses>): Generator {
            try {
                const response = yield call(getCoursesRequest, 'courses');
                yield put({
                    type: fetchCoursesSucceeded.type,
                    payload: { courses: response },
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

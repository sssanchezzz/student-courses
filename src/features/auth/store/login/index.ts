import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { LoginUser, User } from 'types/user';
import usersService from 'services/user_service';
import { logoutReducer } from 'features/auth/store/logout';

export type LoginState = {
    user: User | null;
    isLoading: boolean;
    errorMessage: string | null;
};

const initialState: LoginState = {
    user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')!)
        : null,
    isLoading: false,
    errorMessage: null,
};

// actions

export const loginUser = createAction(
    'LOGIN_USER_ATTEMPT',
    (user: LoginUser) => ({
        payload: {
            user,
        },
    })
);

export const loginUserSucceeded = createAction(
    'LOGIN_USER_SUCCEEDED',
    (user: User) => ({
        payload: {
            user,
        },
    })
);

export const loginUserFailed = createAction(
    'LOGIN_USER_FAILED',
    (message: string) => ({
        payload: {
            message,
        },
    })
);

// selectors

export const getIsUserLoggedIn = (state: RootState) =>
    state.login.user !== null;

export const getIsLoggingIn = (state: RootState) => state.login.isLoading;

export const getUser = (state: RootState) => state.login.user;

export const getErrorMessage = (state: RootState) => state.login.errorMessage;

// reducer

const loginReducer = (builder: ActionReducerMapBuilder<LoginState>) => {
    builder
        .addCase(loginUser, (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        })
        .addCase(loginUserSucceeded, (state, action) => {
            return {
                isLoading: false,
                user: action.payload.user,
                errorMessage: null,
            };
        })
        .addCase(loginUserFailed, (state, action) => {
            return {
                user: null,
                isLoading: false,
                errorMessage: action.payload.message,
            };
        });
};

// saga

export function* loginSaga() {
    yield takeEvery(
        loginUser.type,
        function* (action: ReturnType<typeof loginUser>): Generator {
            try {
                const user = yield call(
                    [usersService, usersService.login],
                    action.payload.user
                );

                if (user === null) {
                    throw new Error();
                }
                localStorage.setItem('user', JSON.stringify(user));
                yield put({
                    type: loginUserSucceeded.type,
                    payload: { user },
                });
            } catch (err) {
                yield put({
                    type: loginUserFailed.type,
                    payload: { message: 'Invalid Login or Password' },
                });
            }
        }
    );
}

// slice

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        loginReducer(builder);
        logoutReducer(builder);
    },
});

// slice

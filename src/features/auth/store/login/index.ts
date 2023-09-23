import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { call, put, takeEvery } from 'redux-saga/effects';
import { LoginUser, User } from 'types/user';
import usersService from 'services/user_service';
import { logoutReducer } from 'features/auth/store/logout';

export type AuthState = {
    userId: User | null;
    isLoading: boolean;
    error: boolean;
};

const initialState: AuthState = {
    userId: getUserFromLocalStorage(),
    isLoading: false,
    error: false,
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

export const loginUserFailed = createAction('LOGIN_USER_FAILED');

export const clearLoginError = createAction('CLEAR_LOGIN_ERROR');

// selectors

export const getIsUserLoggedIn = (state: RootState) =>
    state.auth.userId !== null;

export const getIsLoggingIn = (state: RootState) => state.auth.isLoading;

export const getUser = (state: RootState) => state.auth.userId;

export const getUserId = (state: RootState) => state.auth.userId?.id;

export const getReceivedLoginError = (state: RootState) => state.auth.error;

// reducer

const loginReducer = (builder: ActionReducerMapBuilder<AuthState>) => {
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
                userId: action.payload.user,
                error: false,
            };
        })
        .addCase(loginUserFailed, (state, action) => {
            return {
                userId: null,
                isLoading: false,
                error: true,
            };
        })
        .addCase(clearLoginError, (state, action) => {
            return {
                ...state,
                error: false,
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

                localStorage.setItem('user', JSON.stringify(user));

                yield put({
                    type: loginUserSucceeded.type,
                    payload: { user },
                });
            } catch (err) {
                yield put({
                    type: loginUserFailed.type,
                });
            }
        }
    );
}

// slice

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        loginReducer(builder);
        logoutReducer(builder);
    },
});

// helpers

function getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

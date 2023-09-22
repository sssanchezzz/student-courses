import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import usersService from 'services/user_service';
import { LoginState } from 'features/auth/store/login';

// actions

export const logoutUser = createAction('LOGOUT_USER_ATTEMPT');

export const logoutUserSucceeded = createAction('LOGOUT_USER_SUCCEEDED');

export const logoutUserFailed = createAction('LOGOUT_USER_FAILED');

// reducer

export const logoutReducer = (builder: ActionReducerMapBuilder<LoginState>) => {
    builder
        .addCase(logoutUser, (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        })
        .addCase(logoutUserSucceeded, (state, action) => {
            return {
                ...state,
                isLoading: false,
                user: null,
            };
        })
        .addCase(logoutUserFailed, (state, action) => {
            return {
                ...state,
                user: null,
                isLoading: false,
            };
        });
};

// saga

export function* logoutSaga() {
    yield takeEvery(
        logoutUser.type,
        function* (action: ReturnType<typeof logoutUser>): Generator {
            try {
                localStorage.removeItem('user');
                yield put({
                    type: logoutUserSucceeded.type,
                });
            } catch (err) {
                yield put({
                    type: logoutUserFailed.type,
                });
            }
        }
    );
}

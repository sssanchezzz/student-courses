import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { CourseTopic } from 'types/course_topic';

type DrawerState = {
    isDrawerOpen: boolean;
    topic: CourseTopic | null;
};

const initialState: DrawerState = {
    isDrawerOpen: false,
    topic: null,
};

// actions

export const toggleDrawer = createAction(
    'TOGGLE_DRAWER',
    (topic: CourseTopic | null) => ({
        payload: {
            topic,
        },
    })
);

// selectors

export const getIsDrawerOpen = (state: RootState) =>
    state.course_drawer.isDrawerOpen && state.course_drawer.topic !== null;

export const getSelectedTopic = (state: RootState) => state.course_drawer.topic;

// reducer

const courseDrawerReducer = (builder: ActionReducerMapBuilder<DrawerState>) => {
    builder.addCase(toggleDrawer, (state, action) => {
        const nextIsOpenState = !state.isDrawerOpen;

        return {
            ...state,
            isDrawerOpen: nextIsOpenState,
            topic: nextIsOpenState ? action.payload.topic : null,
        };
    });
};

// slice

export const courseDrawerSlice = createSlice({
    name: 'course_drawer',
    initialState,
    reducers: {},
    extraReducers: courseDrawerReducer,
});

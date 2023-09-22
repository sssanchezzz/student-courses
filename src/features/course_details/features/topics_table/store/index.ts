import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { CourseTopic } from 'types/course_topic';
import { Order } from 'types/order';

type SortingProperty = keyof Pick<CourseTopic, 'name' | 'dateRange'>;
type TopicsTableState = {
    sortingProperty: SortingProperty;
    order: Order;
    topics: CourseTopic[];
};

const initialState: TopicsTableState = {
    sortingProperty: 'dateRange',
    order: 'asc',
    topics: [],
};

// actions

export const sortTopics = createAction(
    'SORT_TOPICS',
    (sortingProperty: SortingProperty, order: Order) => ({
        payload: {
            sortingProperty,
            order,
        },
    })
);

// selectors

export const getSortedTopics = (state: RootState) => state.sort_topics.topics;

// reducer

const sortTopicsReducer = (
    builder: ActionReducerMapBuilder<TopicsTableState>
) => {
    builder.addCase(sortTopics, (state, action) => {
        return {
            ...state,
            order: action.payload.order,
            sortingProperty: action.payload.sortingProperty,
        };
    });
};

// slice

export const sortTopicsSlice = createSlice({
    name: 'sort_topics',
    initialState,
    reducers: {},
    extraReducers: sortTopicsReducer,
});

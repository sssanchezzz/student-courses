import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';
import { isAfter, isBefore } from 'date-fns';
import { logoutUserSucceeded } from 'features/nav/store';
import { fetchCourseSucceeded } from 'features/course_details/store';
import { RootState } from 'store';
import { CourseTopic } from 'types/course_topic';
import { Order } from 'types/order';

export type TopicSortingProperty = keyof Pick<
    CourseTopic,
    'name' | 'dateRange'
>;

type DateArg = string | number | Date;

type TopicsTableState = {
    sortingProperty: TopicSortingProperty;
    filterQuery: string;
    order: Order;
    _topics: CourseTopic[];
    topics: CourseTopic[];
};

const initialState: TopicsTableState = {
    sortingProperty: 'dateRange',
    filterQuery: '',
    order: 'asc',
    _topics: [],
    topics: [],
};

// actions

export const sortTopics = createAction(
    'SORT_TOPICS',
    (sortingProperty: TopicSortingProperty, order: Order) => ({
        payload: {
            sortingProperty,
            order,
        },
    })
);

export const filterTopics = createAction(
    'FILTER_TOPICS',
    (filterQuery: string) => ({ payload: { filterQuery } })
);

// selectors

export const getSortedTopics = (state: RootState) => state.sort_topics.topics;

export const getFilterQuery = (state: RootState) =>
    state.sort_topics.filterQuery;

export const getSortOrder = (state: RootState) => state.sort_topics.order;

export const getSortingProperty = (state: RootState) =>
    state.sort_topics.sortingProperty;

// reducer

const sortTopicsReducer = (
    builder: ActionReducerMapBuilder<TopicsTableState>
) => {
    builder
        .addCase(fetchCourseSucceeded, (state, action) => {
            const comparator = getDateComparator(state.order);

            const sortedTopics = [...action.payload.course.topics].sort(
                (a, b) => comparator(a, b)
            );
            return {
                ...state,
                _topics: sortedTopics,
                topics: sortedTopics,
            };
        })
        .addCase(sortTopics, (state, action) => {
            const comparator =
                action.payload.sortingProperty === 'name'
                    ? getComparator(action.payload.order)
                    : getDateComparator(action.payload.order);

            const sortedTopics = [...state._topics].sort(comparator);
            return {
                ...state,
                order: action.payload.order,
                sortingProperty: action.payload.sortingProperty,
                topics: sortedTopics,
            };
        })
        .addCase(filterTopics, (state, action) => {
            const comparator =
                state.sortingProperty === 'name'
                    ? getComparator(state.order)
                    : getDateComparator(state.order);

            const filteredTopics = [...state._topics]
                .filter((topic) =>
                    topic.name
                        .toLowerCase()
                        .includes(action.payload.filterQuery.toLowerCase())
                )
                .sort(comparator);

            return {
                ...state,
                filterQuery: action.payload.filterQuery,
                topics: filteredTopics,
            };
        })
        .addCase(logoutUserSucceeded, (action, payload) => {
            return initialState;
        });
};

// slice

export const sortTopicsSlice = createSlice({
    name: 'sort_topics',
    initialState,
    reducers: {},
    extraReducers: sortTopicsReducer,
});

// helpers

function getComparator(order: Order) {
    return function (
        a: CourseTopic,
        b: CourseTopic,
        orderBy: keyof CourseTopic = 'name'
    ) {
        return order === 'asc'
            ? ascendingComparator(a, b, orderBy)
            : -ascendingComparator(a, b, orderBy);
    };
}

function getDateComparator(order: Order) {
    return function (a: CourseTopic, b: CourseTopic) {
        return order === 'asc'
            ? ascendingDateComparator(a, b)
            : -ascendingDateComparator(a, b);
    };
}

function ascendingComparator(
    a: CourseTopic,
    b: CourseTopic,
    orderBy: keyof CourseTopic
) {
    if (b[orderBy] < a[orderBy]) {
        return 1;
    }
    if (b[orderBy] > a[orderBy]) {
        return -1;
    }
    return 0;
}

function ascendingDateComparator(a: CourseTopic, b: CourseTopic) {
    const dateA = a.dateRange[0];
    const dateB = b.dateRange[0];

    if (isAfter(dateA, dateB)) {
        return 1;
    }
    if (isBefore(dateA, dateB)) {
        return -1;
    }
    return 0;
}

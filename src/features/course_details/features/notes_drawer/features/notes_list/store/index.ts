import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { UserTopicNote } from 'types/user_course_topic_note';
import userNotesService from 'services/user_notes_service';
import { getUserId } from 'features/login_form/store/login';
import { getCourseId } from 'features/course_details/store';
import { createNoteSucceeded } from 'features/course_details/features/notes_drawer/features/notes_input/store';
import { logoutUserSucceeded } from 'features/nav/store';

type NotesState = {
    notes: UserTopicNote[];
    isLoading: boolean;
};

const initialState: NotesState = {
    notes: [],
    isLoading: false,
};

// actions

export const fetchNotes = createAction(
    'FETCH_NOTES_ATTEMPT',
    (topicId: string) => ({
        payload: { topicId },
    })
);

export const fetchNotesSucceeded = createAction(
    'FETCH_NOTES_SUCCEEDED',
    (notes: UserTopicNote[]) => ({ payload: { notes } })
);

export const fetchNotesFailed = createAction('FETCH_NOTES_FAILED');

// selectors

export const getNotes = (state: RootState) => state.notes.notes;

export const getNotesLoading = (state: RootState) => state.notes.isLoading;

// reducer

const notesReducer = (builder: ActionReducerMapBuilder<NotesState>) => {
    builder
        .addCase(fetchNotes, (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        })
        .addCase(fetchNotesSucceeded, (state, action) => {
            return {
                ...state,
                isLoading: false,
                notes: action.payload.notes,
            };
        })
        .addCase(fetchNotesFailed, (state, action) => {
            return initialState;
        })
        .addCase(createNoteSucceeded, (state, action) => {
            return {
                ...state,
                notes: [...state.notes, action.payload.note],
            };
        })
        .addCase(logoutUserSucceeded, (action, payload) => {
            return initialState;
        });
};

// saga

export function* notesSaga() {
    yield takeEvery(
        fetchNotes.type,
        function* (action: ReturnType<typeof fetchNotes>): Generator {
            try {
                const userId = yield select(getUserId);
                const courseId = yield select(getCourseId);

                if (!userId || !courseId) {
                    throw new Error("Couldn't fetch notes.");
                }

                const response = yield call(
                    [userNotesService, userNotesService.getUserNotesForTopic],
                    userId as string,
                    courseId as string,
                    action.payload.topicId
                );

                yield put({
                    type: fetchNotesSucceeded.type,
                    payload: { notes: response },
                });
            } catch (err) {
                yield put({ type: fetchNotesFailed.type });
            }
        }
    );
}

// slice

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: notesReducer,
});

import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';
import { getUserId } from 'features/auth/store/login';
import { logoutUserSucceeded } from 'features/auth/store/logout';
import { getSelectedTopicId } from 'features/course_details/features/notes_drawer/store';
import { getCourseId } from 'features/course_details/store';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import userNotesService from 'services/user_notes_service';
import { RootState } from 'store';
import { UserTopicNote } from 'types/user_course_topic_note';

type NotesInputState = {
    isLoading: boolean;
    note: string;
    errorMessage: string | null;
};

const initialState: NotesInputState = {
    note: '',
    isLoading: false,
    errorMessage: null,
};

// actions

export const updateNote = createAction('SET_NOTE', (note: string) => ({
    payload: { note: note },
}));

export const createNote = createAction('CREATE_NOTE_ATTEMPT');

export const createNoteSucceeded = createAction(
    'CREATE_NOTE_SUCCEEDED',
    (note: UserTopicNote) => ({ payload: { note } })
);

export const createNoteFailed = createAction(
    'CREATE_NOTE_FAILED',
    (errorMessage: string) => ({ payload: { errorMessage } })
);

// selectors

export const getNoteValue = (state: RootState) => state.notes_input.note;

export const getIsCreatingNote = (state: RootState) =>
    state.notes_input.isLoading;

// reducer

const courseDrawerReducer = (
    builder: ActionReducerMapBuilder<NotesInputState>
) => {
    builder
        .addCase(updateNote, (state, action) => {
            return {
                ...state,
                note: action.payload.note,
            };
        })
        .addCase(createNote, (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        })
        .addCase(createNoteSucceeded, (state, action) => {
            return {
                ...state,
                isLoading: false,
                note: '',
            };
        })
        .addCase(createNoteFailed, (state, action) => {
            return {
                ...state,
                isLoading: false,
                note: '',
                errorMessage: action.payload.errorMessage,
            };
        })
        .addCase(logoutUserSucceeded, (action, payload) => {
            return initialState;
        });
};

// saga

export function* notesInputSaga() {
    yield takeEvery(
        createNote.type,
        function* (action: ReturnType<typeof createNote>): Generator {
            try {
                const userId = yield select(getUserId);
                const courseId = yield select(getCourseId);
                const note = yield select(getNoteValue);
                const topicId = yield select(getSelectedTopicId);

                if (!userId || !courseId || !topicId) {
                    throw new Error('Unable to create note');
                }

                const notePayload: Omit<UserTopicNote, 'id'> = {
                    noteText: note as string,
                    userId: userId as string,
                    courseId: courseId as string,
                    topicId: topicId as string,
                };

                const response = yield call(
                    [userNotesService, userNotesService.createNoteForTopic],
                    notePayload
                );

                yield put({
                    type: createNoteSucceeded.type,
                    payload: { note: response },
                });
            } catch (err) {
                yield put({
                    type: createNoteFailed.type,
                    payload: { message: 'Failed to create note' },
                });
            }
        }
    );
}

// slice

export const notesInputSlice = createSlice({
    name: 'notes_input',
    initialState,
    reducers: {},
    extraReducers: courseDrawerReducer,
});

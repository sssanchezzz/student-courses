import { courseSaga } from 'features/course_details/store';
import { coursesSaga } from 'features/courses_list/store';
import { loginSaga } from 'features/auth/store/login';
import { all, fork } from 'redux-saga/effects';
import { logoutSaga } from 'features/auth/store/logout';
import { notesSaga } from 'features/course_details/features/notes_drawer/notes_list/store';
import { notesInputSaga } from 'features/course_details/features/notes_drawer/notes_input/store';

export function* rootSaga() {
    yield all([
        fork(coursesSaga),
        fork(courseSaga),
        fork(loginSaga),
        fork(logoutSaga),
        fork(notesSaga),
        fork(notesInputSaga),
    ]);
}

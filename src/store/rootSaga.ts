import { courseSaga } from 'features/course_details/store';
import { coursesSaga } from 'features/courses_list/store';
import { loginSaga } from 'features/login_form/store/login';
import { all, fork } from 'redux-saga/effects';
import { logoutSaga } from 'features/nav/store';
import { notesInputSaga } from 'features/course_details/features/notes_drawer/features/notes_input/store';
import { notesSaga } from 'features/course_details/features/notes_drawer/features/notes_list/store';

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

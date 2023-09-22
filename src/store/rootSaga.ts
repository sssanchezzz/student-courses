import { courseSaga } from 'features/course_details/store';
import { coursesSaga } from 'features/courses_list/store';
import { loginSaga } from 'features/auth/store/login';
import { all, fork } from 'redux-saga/effects';
import { logoutSaga } from 'features/auth/store/logout';

export function* rootSaga() {
    yield all([
        fork(coursesSaga),
        fork(courseSaga),
        fork(loginSaga),
        fork(logoutSaga),
    ]);
}

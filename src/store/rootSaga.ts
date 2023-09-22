import { courseSaga } from 'features/course_details/store';
import { coursesSaga } from 'features/courses_list/store';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
    yield all([fork(coursesSaga), fork(courseSaga)]);
}

import { fork, all } from 'redux-saga/effects';
import { watchAuth, watchLogout } from './user';
import { watchFetchSubjectMedia, watchFetchMoreMedia } from './tenant';
import formActionSaga from 'redux-form-saga';

export default function* root() {
  yield all([
    fork(watchAuth),
    fork(watchLogout),
    fork(formActionSaga),
    fork(watchFetchSubjectMedia),
    fork(watchFetchMoreMedia),
  ]);
}

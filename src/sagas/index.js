import { fork, all } from 'redux-saga/effects';
import { watchAuthorize, watchLogout } from './auth';
import formActionSaga from 'redux-form-saga';

export default function* root() {
  yield all([fork(watchAuthorize), fork(watchLogout), fork(formActionSaga)]);
}

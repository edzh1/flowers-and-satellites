import { fork, all } from 'redux-saga/effects';
import { watchAuthorize, watchLogout } from './user';
import formActionSaga from 'redux-form-saga';

export default function* root() {
  yield all([fork(watchAuthorize), fork(watchLogout), fork(formActionSaga)]);
}

import { fork, all } from 'redux-saga/effects';
import { watchAuth, watchLogout, watchFetchTenants } from './user';
import { watchTenantAuth, watchFetchSubjectMedia } from './tenant';
import formActionSaga from 'redux-form-saga';

export default function* root() {
  yield all([
    fork(watchAuth),
    fork(watchFetchTenants),
    fork(watchLogout),
    fork(formActionSaga),
    fork(watchTenantAuth),
    fork(watchFetchSubjectMedia),
  ]);
}

import { fork, all } from 'redux-saga/effects';
import { watchAuthorize } from './auth';

export default function* root() {
  yield all([fork(watchAuthorize)]);
}

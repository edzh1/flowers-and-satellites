import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from '../actions/auth';
import { AUTHORIZE } from '../constants/AuthActionTypes';
import { api } from '../services';

export function* authorize(action) {
  try {
    const token = yield call(api.authorize, action.payload);
    yield put(actions.authorize(token));
  } catch (error) {
    yield put(actions.authorizeFailure(error));
  }
}

export function* watchAuthorize() {
  yield takeEvery(AUTHORIZE, authorize);
}

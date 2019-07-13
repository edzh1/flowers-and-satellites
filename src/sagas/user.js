import { takeEvery, put, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import * as actions from '../actions/user';
import { LOGOUT } from '../constants/ActionTypes';
import { api } from '../services';

export function* authorize(action) {
  const { login, password } = action.payload;

  try {
    const response = yield call(api.authorize, { login, password });
    const genericToken = response.access_token;
    yield put(actions.authorize.success({ genericToken }));
    localStorage.setItem('genericToken', genericToken);
  } catch (error) {
    const formError = new SubmissionError({
      _error: 'Login failed, please check your credentials and try again',
    });

    yield put(actions.authorize.failure(formError));
  }
}

export function* logout() {
  yield put(actions.authorize.logout());
  localStorage.setItem('genericToken', '');
}

export function* watchAuthorize() {
  yield takeEvery(actions.authorize.REQUEST, authorize);
}

export function* watchLogout() {
  yield takeEvery(LOGOUT, logout);
}

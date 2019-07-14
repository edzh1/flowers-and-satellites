import { takeEvery, put, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import * as actions from '../actions/user';
import { LOGOUT, FETCH_TENANTS_REQUEST } from '../constants/ActionTypes';
import { api } from '../services';

export function* auth(action) {
  const { login, password } = action.payload;

  try {
    const response = yield call(api.userAuth, { login, password });
    const genericToken = response.access_token;
    yield put(actions.auth.success({ genericToken }));
    localStorage.setItem('genericToken', genericToken);
  } catch (error) {
    const formError = new SubmissionError({
      _error: 'Login failed, please check your credentials and try again',
    });

    yield put(actions.auth.failure(formError));
  }
}

export function* fetchTenants(action) {
  const { genericAccessToken } = action.payload;

  try {
    const tenants = yield call(api.fetchTenants, { genericAccessToken });
    yield put(actions.fetchTenants.success({ tenants }));
  } catch (error) {
    yield put(actions.fetchTenants.failure(error));
  }
}

export function* logout() {
  yield put(actions.auth.logout());
  localStorage.setItem('genericToken', '');
}

export function* watchFetchTenants() {
  yield takeEvery(FETCH_TENANTS_REQUEST, fetchTenants);
}

export function* watchAuth() {
  yield takeEvery(actions.auth.REQUEST, auth);
}

export function* watchLogout() {
  yield takeEvery(LOGOUT, logout);
}

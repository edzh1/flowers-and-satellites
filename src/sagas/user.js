import { takeEvery, put, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import * as actions from '../actions/user';
import { LOGOUT, FETCH_TENANTS_REQUEST } from '../constants/ActionTypes';
import { api } from '../services';

export function* auth({ login, password }) {
  try {
    const response = yield call(api.userAuth, { login, password });
    const genericToken = response.access_token;
    localStorage.setItem('genericToken', genericToken);
    yield put(actions.auth.success({ genericToken }));

    return genericToken;
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
    const tenantsResponse = yield call(api.fetchTenants, genericAccessToken);
    const tenants = tenantsResponse.tenants;
    localStorage.setItem('tenantId', tenants[0].tenant_id);
    yield put(actions.fetchTenants.success(tenants));

    return tenants;
  } catch (error) {
    yield put(actions.fetchTenants.failure(error));
  }
}

export function* authFlow(action) {
  const { login, password, history } = action.payload;
  const genericToken = yield call(auth, { login, password });

  if (genericToken) {
    const tenants = yield fetchTenants(actions.fetchTenants(genericToken));

    if (tenants) history.push('/grid');
  }
}

export function* logout() {
  yield put(actions.auth.logout());
  localStorage.setItem('genericToken', '');
  localStorage.setItem('tenantToken', '');
  localStorage.setItem('tenantId', '');
}

export function* watchFetchTenants() {
  yield takeEvery(FETCH_TENANTS_REQUEST, fetchTenants);
}

export function* watchAuth() {
  yield takeEvery(actions.auth.REQUEST, authFlow);
}

export function* watchLogout() {
  yield takeEvery(LOGOUT, logout);
}

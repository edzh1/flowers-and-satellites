import { takeEvery, put, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import * as userActions from '../actions/user';
import * as tenantActions from '../actions/tenant';
import { LOGOUT, FETCH_TENANTS_REQUEST } from '../constants/ActionTypes';
import { api } from '../services';
import { auth as authTenant } from './tenant';

export function* auth({ login, password }) {
  try {
    const response = yield call(api.userAuth, { login, password });
    const genericToken = response.access_token;
    localStorage.setItem('genericToken', genericToken);
    yield put(userActions.auth.success({ genericToken }));

    return genericToken;
  } catch (error) {
    const formError = new SubmissionError({
      _error: 'Login failed, please check your credentials and try again',
    });

    yield put(userActions.auth.failure(formError));
  }
}

export function* fetchTenants(action) {
  const { genericAccessToken } = action.payload;

  try {
    const tenantsResponse = yield call(api.fetchTenants, genericAccessToken);
    const tenants = tenantsResponse.tenants;
    localStorage.setItem('tenantId', tenants[0].tenant_id);
    yield put(userActions.fetchTenants.success(tenants));

    return tenants;
  } catch (error) {
    yield put(userActions.fetchTenants.failure(error));
  }
}

export function* authFlow(action) {
  const { login, password, history } = action.payload;
  const genericAccessToken = yield call(auth, { login, password });

  if (genericAccessToken) {
    const tenants = yield fetchTenants(userActions.fetchTenants(genericAccessToken));
    const tenantId = tenants[0].tenant_id;

    if (tenantId) {
      const tenantToken = yield authTenant(tenantActions.auth({ genericAccessToken, tenantId }));

      if (tenantToken) {
        history.push('/grid/flowers_8hmdag');
      }
    }
  }
}

export function* logout() {
  yield put(userActions.auth.logout());
  localStorage.setItem('genericToken', '');
  localStorage.setItem('tenantToken', '');
  localStorage.setItem('tenantId', '');
}

export function* watchFetchTenants() {
  yield takeEvery(FETCH_TENANTS_REQUEST, fetchTenants);
}

export function* watchAuth() {
  yield takeEvery(userActions.auth.REQUEST, authFlow);
}

export function* watchLogout() {
  yield takeEvery(LOGOUT, logout);
}

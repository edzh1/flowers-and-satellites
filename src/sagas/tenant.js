import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from '../actions/tenant';
import { TENANT_AUTH_REQUEST, FETCH_SUBJECT_MEDIA_REQUEST } from '../constants/ActionTypes';
import { api } from '../services';

export function* auth(action) {
  const { tenantId, genericAccessToken } = action.payload;

  try {
    const tenantResponse = yield call(api.tenantAuth, { tenantId, genericAccessToken });
    const tenantToken = tenantResponse.access_token;
    localStorage.setItem('tenantToken', tenantToken);
    yield put(actions.auth.success(tenantToken));
  } catch (error) {
    yield put(actions.auth.failure(error));
  }
}

export function* fetchSubjectMedia(action) {
  const { subjectId, accessToken, page, limit } = action.payload;

  try {
    const media = yield call(api.fetchSubjectMedia, { subjectId, accessToken, page, limit });
    yield put(actions.fetchSubjectMedia.success({ media }));
  } catch (error) {
    yield put(actions.fetchSubjectMedia.failure(error));
  }
}

export function* watchTenantAuth() {
  yield takeEvery(TENANT_AUTH_REQUEST, auth);
}

export function* watchFetchSubjectMedia() {
  yield takeEvery(FETCH_SUBJECT_MEDIA_REQUEST, fetchSubjectMedia);
}

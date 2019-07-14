import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as actions from '../actions/tenant';
import { FETCH_SUBJECT_MEDIA_REQUEST, FETCH_MORE_MEDIA_REQUEST } from '../constants/ActionTypes';
import { api } from '../services';
import getImage from '../utils/get-image';

export function* auth(action) {
  const { tenantId, genericAccessToken } = action.payload;

  try {
    const tenantResponse = yield call(api.tenantAuth, { tenantId, genericAccessToken });
    const tenantToken = tenantResponse.access_token;
    localStorage.setItem('tenantToken', tenantToken);
    yield put(actions.auth.success(tenantToken));
    return tenantToken;
  } catch (error) {
    yield put(actions.auth.failure(error));
  }
}

export function* fetchSubjectMedia(action) {
  const { subjectId, accessToken, limit } = action.payload;

  try {
    const mediaResponse = yield call(api.fetchSubjectMedia, { subjectId, accessToken, limit });
    const mediaDownloads = mediaResponse.data.map(mediaObj => mediaObj.media.media_url);
    const data = yield all(mediaDownloads.map(mediaUrl => call(getImage, mediaUrl)));

    yield put(actions.fetchSubjectMedia.success({ data, paging: mediaResponse.paging }));
  } catch (error) {
    yield put(actions.fetchSubjectMedia.failure(error));
  }
}

export function* fetchMoreMedia(action) {
  const { url, accessToken } = action.payload;

  try {
    const mediaResponse = yield call(api.fetchMoreMedia, { url, accessToken });
    yield put(actions.fetchMoreMedia.success(mediaResponse));
  } catch (error) {
    yield put(actions.fetchMoreMedia.failure(error));
  }
}

export function* watchFetchSubjectMedia() {
  yield takeEvery(FETCH_SUBJECT_MEDIA_REQUEST, fetchSubjectMedia);
}

export function* watchFetchMoreMedia() {
  yield takeEvery(FETCH_MORE_MEDIA_REQUEST, fetchMoreMedia);
}

import {
  TENANT_AUTH_REQUEST,
  TENANT_AUTH_SUCCESS,
  TENANT_AUTH_FAILURE,
  FETCH_SUBJECT_MEDIA_REQUEST,
  FETCH_SUBJECT_MEDIA_SUCCESS,
  FETCH_SUBJECT_MEDIA_FAILURE,
  FETCH_MORE_MEDIA_REQUEST,
  FETCH_MORE_MEDIA_SUCCESS,
  FETCH_MORE_MEDIA_FAILURE,
} from '../constants/ActionTypes';

export const auth = ({ tenantId, genericAccessToken }) => ({
  type: TENANT_AUTH_REQUEST,
  payload: { tenantId, genericAccessToken },
});

auth.success = accessToken => ({
  type: TENANT_AUTH_SUCCESS,
  payload: { accessToken },
});

auth.failure = () => ({
  type: TENANT_AUTH_FAILURE,
  payload: {},
});

export const fetchSubjectMedia = ({ subjectId, accessToken, limit }) => ({
  type: FETCH_SUBJECT_MEDIA_REQUEST,
  payload: { subjectId, accessToken, limit },
});

fetchSubjectMedia.success = ({ data, paging }) => ({
  type: FETCH_SUBJECT_MEDIA_SUCCESS,
  payload: { data, paging },
});

fetchSubjectMedia.failure = () => ({
  type: FETCH_SUBJECT_MEDIA_FAILURE,
  payload: {},
});

export const fetchMoreMedia = ({ url, accessToken }) => ({
  type: FETCH_MORE_MEDIA_REQUEST,
  payload: { url, accessToken },
});

fetchMoreMedia.success = ({ data, paging }) => ({
  type: FETCH_MORE_MEDIA_SUCCESS,
  payload: { data, paging },
});

fetchMoreMedia.failure = () => ({
  type: FETCH_MORE_MEDIA_FAILURE,
  payload: {},
});

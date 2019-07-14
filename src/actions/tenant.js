import {
  TENANT_AUTH_REQUEST,
  TENANT_AUTH_SUCCESS,
  TENANT_AUTH_FAILURE,
  FETCH_SUBJECT_REQUEST,
  FETCH_SUBJECT_SUCCESS,
  FETCH_SUBJECT_FAILURE,
  FETCH_SUBJECT_MEDIA_REQUEST,
  FETCH_SUBJECT_MEDIA_SUCCESS,
  FETCH_SUBJECT_MEDIA_FAILURE,
} from '../constants/ActionTypes';

export const auth = (tenantId, genericAccessToken) => ({
  type: TENANT_AUTH_REQUEST,
  payload: { tenantId, genericAccessToken },
});

auth.success = ({ name, accessToken }) => ({
  type: TENANT_AUTH_SUCCESS,
  payload: { name, accessToken },
});

auth.failure = () => ({
  type: TENANT_AUTH_FAILURE,
  payload: {},
});

export const fetchSubject = (subjectId, accessToken) => ({
  type: FETCH_SUBJECT_REQUEST,
  payload: { subjectId, accessToken },
});

fetchSubject.success = subject => ({
  type: FETCH_SUBJECT_SUCCESS,
  payload: { subject },
});

fetchSubject.failure = () => ({
  type: FETCH_SUBJECT_FAILURE,
  payload: {},
});

export const fetchSubjectMedia = ({ subjectId, accessToken, page, limit }) => ({
  type: FETCH_SUBJECT_MEDIA_REQUEST,
  payload: { subjectId, accessToken, page, limit },
});

fetchSubjectMedia.success = media => ({
  type: FETCH_SUBJECT_MEDIA_SUCCESS,
  payload: { media },
});

fetchSubjectMedia.failure = () => ({
  type: FETCH_SUBJECT_MEDIA_FAILURE,
  payload: {},
});

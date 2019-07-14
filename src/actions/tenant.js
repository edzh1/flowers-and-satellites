import {
  TENANT_AUTH_REQUEST,
  TENANT_AUTH_SUCCESS,
  FETCH_SUBJECT_REQUEST,
  FETCH_SUBJECT_SUCCESS,
  FETCH_MORE_SUBJECT_DATA_REQUEST,
  FETCH_MORE_SUBJECT_DATA_SUCCESS,
} from '../constants/ActionTypes';

export const auth = (tenant, genericAccessToken) => ({
  type: TENANT_AUTH_REQUEST,
  payload: { tenant, genericAccessToken },
});

export const authSuccess = ({ name, accessToken }) => ({
  type: TENANT_AUTH_SUCCESS,
  payload: { name, accessToken },
});

export const fetchSubject = (subjectId, accessToken) => ({
  type: FETCH_SUBJECT_REQUEST,
  payload: { subjectId, accessToken },
});

export const fetchSubjectSuccess = subject => ({
  type: FETCH_SUBJECT_SUCCESS,
  payload: { subject },
});

export const fetchMoreSubjectData = ({ subjectId, accessToken, page, limit }) => ({
  type: FETCH_MORE_SUBJECT_DATA_REQUEST,
  payload: { subjectId, accessToken, page, limit },
});

export const fetchMoreSubjectDataSuccess = data => ({
  type: FETCH_MORE_SUBJECT_DATA_SUCCESS,
  payload: { data },
});

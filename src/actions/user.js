import { AUTH, FETCH_TENANTS_REQUEST, FETCH_TENANTS_SUCCESS, FETCH_TENANTS_FAILURE } from '../constants/ActionTypes';
import { createFormAction } from 'redux-form-saga';

export const auth = createFormAction(AUTH);

export const fetchTenants = genericAccessToken => ({
  type: FETCH_TENANTS_REQUEST,
  payload: { genericAccessToken },
});

fetchTenants.success = tenants => ({
  type: FETCH_TENANTS_SUCCESS,
  payload: { tenants },
});

fetchTenants.failure = () => ({
  type: FETCH_TENANTS_FAILURE,
  payload: {},
});

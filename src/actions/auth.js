import { AUTHORIZE, AUTHORIZE_FAILURE } from '../constants/AuthActionTypes';

export function authorize() {
  return {
    type: AUTHORIZE,
  };
}

export function authorizeFailure() {
  return {
    type: AUTHORIZE_FAILURE,
  };
}

import { AUTHORIZE_SUCCESS, LOGOUT } from '../constants/AuthActionTypes';

const initialState = {
  token: localStorage.getItem('token') || '',
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTHORIZE_SUCCESS:
      return {
        ...state,
        token: action.payload.access_token,
      };
    case LOGOUT:
      return {
        ...state,
        token: '',
      };
    default:
      return state;
  }
}

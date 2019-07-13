import { AUTHORIZE_SUCCESS, LOGOUT } from '../constants/AuthActionTypes';

const initialState = {
  genericToken: localStorage.getItem('genericToken') || '',
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTHORIZE_SUCCESS:
      return {
        ...state,
        genericToken: action.payload.genericToken,
      };
    case LOGOUT:
      return {
        ...state,
        genericToken: '',
      };
    default:
      return state;
  }
}

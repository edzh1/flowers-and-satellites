import { AUTHORIZE_SUCCESS, LOGOUT } from '../constants/ActionTypes';

const initialState = {
  genericToken: localStorage.getItem('genericToken') || '',
};

export default function user(state = initialState, action) {
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

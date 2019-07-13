import { AUTHORIZE } from '../constants/AuthActionTypes';

const initialState = {
  token: '',
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTHORIZE:
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
}

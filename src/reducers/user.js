import { AUTH_SUCCESS, LOGOUT, FETCH_TENANTS_SUCCESS } from '../constants/ActionTypes';

const initialState = {
  genericToken: localStorage.getItem('genericToken') || '',
  tenant: {
    tenant_id: localStorage.getItem('tenantId') || '',
  },
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        genericToken: action.payload.genericToken,
      };
    case FETCH_TENANTS_SUCCESS:
      return {
        ...state,
        tenant: action.payload.tenants[0],
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

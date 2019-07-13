import {
  TENANT_AUTH_SUCCESS,
  GET_TENANT_SUCCESS,
  GET_SUBJECT_SUCCESS,
  SUBJECT_LOAD_MORE_SUCCESS,
} from '../constants/ActionTypes';

const initialState = {
  id: '',
  name: '',
  accessToken: '',
  subjects: {
    flowers: 'flowers_8hmdag',
    satellite: 'satellite_6etd',
  },
  activeSubject: {
    id: '',
    name: '',
    page: 0,
    limit: 10,
    data: [],
    isLoading: false,
    hasMore: false,
  },
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case TENANT_AUTH_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    case GET_TENANT_SUCCESS:
      return {
        ...state,
        ...action.payload.tenant,
      };
    case GET_SUBJECT_SUCCESS:
      return {
        ...state,
        activeSubject: {
          ...action.payload.subject,
        },
      };
    case SUBJECT_LOAD_MORE_SUCCESS:
      return {
        ...state,
        activeSubject: {
          ...state.activeSubject,
          data: [...state.activeSubject.data, action.payload.data],
        },
      };
    default:
      return state;
  }
}

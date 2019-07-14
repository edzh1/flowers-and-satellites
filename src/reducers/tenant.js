import {
  TENANT_AUTH_SUCCESS,
  FETCH_SUBJECT_MEDIA_SUCCESS,
  FETCH_MORE_MEDIA_SUCCESS,
  FETCH_SUBJECT_MEDIA_REQUEST,
} from '../constants/ActionTypes';

const initialState = {
  id: '',
  name: '',
  accessToken: localStorage.getItem('tenantToken') || '',
  subjects: {
    flowers: 'flowers_8hmdag',
    satellite: 'satellite_6etd',
  },
  activeSubject: {
    id: 'flowers_8hmdag',
    name: '',
    page: 0,
    limit: 10,
    media: [],
    isLoading: false,
    hasMore: false,
    paging: {},
  },
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case TENANT_AUTH_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    case FETCH_SUBJECT_MEDIA_REQUEST:
      return {
        ...state,
        activeSubject: {
          ...initialState.activeSubject,
        },
      };
    case FETCH_SUBJECT_MEDIA_SUCCESS:
      return {
        ...state,
        activeSubject: {
          ...state.activeSubject,
          media: [...state.activeSubject.media, ...action.payload.data],
          paging: action.payload.paging,
          hasMore: action.payload.data.length > 0,
        },
      };
    case FETCH_MORE_MEDIA_SUCCESS:
      return {
        ...state,
        activeSubject: {
          ...state.activeSubject,
          media: [...state.activeSubject.media, ...action.payload.data],
          paging: action.payload.paging,
          hasMore: action.payload.data.length > 0,
        },
      };
    default:
      return state;
  }
}

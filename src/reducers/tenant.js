import { TENANT_AUTH_SUCCESS, FETCH_SUBJECT_SUCCESS, FETCH_SUBJECT_MEDIA_SUCCESS } from '../constants/ActionTypes';

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
    media: [],
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
    case FETCH_SUBJECT_SUCCESS:
      return {
        ...state,
        activeSubject: action.payload.subject,
      };
    case FETCH_SUBJECT_MEDIA_SUCCESS:
      return {
        ...state,
        activeSubject: {
          ...state.activeSubject,
          media: [...state.activeSubject.media, action.payload.media],
        },
      };
    default:
      return state;
  }
}

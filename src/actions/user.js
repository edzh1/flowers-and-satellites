import { AUTH } from '../constants/ActionTypes';
import { createFormAction } from 'redux-form-saga';

export const auth = createFormAction(AUTH);

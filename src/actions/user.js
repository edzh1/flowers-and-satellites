import { AUTHORIZE } from '../constants/ActionTypes';
import { createFormAction } from 'redux-form-saga';

export const authorize = createFormAction(AUTHORIZE);

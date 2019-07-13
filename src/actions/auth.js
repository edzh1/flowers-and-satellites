import { AUTHORIZE } from '../constants/AuthActionTypes';
import { createFormAction } from 'redux-form-saga';

export const authorize = createFormAction(AUTHORIZE);

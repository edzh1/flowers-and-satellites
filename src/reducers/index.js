import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import user from './user';
import tenant from './tenant';

const rootReducer = combineReducers({
  user,
  tenant,
  form: reduxFormReducer,
});

export default rootReducer;

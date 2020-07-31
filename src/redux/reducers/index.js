import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import appReducer from './appReducer';

const reducers = combineReducers({
  app: appReducer,
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer,
});

export default reducers;

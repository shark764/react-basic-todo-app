import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import apiSaga from '../sagas/apiSaga';

const initialiseSagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ? composeWithDevTools(applyMiddleware(initialiseSagaMiddleware))
    : compose(applyMiddleware(initialiseSagaMiddleware)),
);

initialiseSagaMiddleware.run(apiSaga);
/* eslint-enable */

export default store;

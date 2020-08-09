import { createBrowserHistory } from 'history';
import { compose, createStore } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import middlewares from './middlewares';
import reducers from './reducer';

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL || '/' });
const initialState = {};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router', 'msg'], //,'auth'
};
const persistedReducer = persistReducer(persistConfig, reducers(history));

export default () => {
  let store = createStore(persistedReducer, initialState, compose(middlewares(history)));

  let persistor = persistStore(store, null);
  return { store, persistor };
};

export { history };

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootEffects from './effects';
import rootReducer from './reducers';

export default function configureStore (initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(
    rootEffects
  );

  return store;
};

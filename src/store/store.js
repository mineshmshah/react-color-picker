import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootEffects from './effects';
import rootReducer from './reducers';

export default function configureStore (initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware]
  const enhancers = [
    applyMiddleware(...middlewares)
  ];
  const composeEnhancers = composeWithDevTools(
    {
      // other compose enhancers if any
      // Specify here other options if needed
    }
  );
  const store = createStore(rootReducer, initialState, composeEnhancers(...enhancers))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      /* eslint-disable global-require */
      const nextReducer = require('./reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(
    rootEffects
  );

  return store;
}


import React from 'react';
import { Provider } from 'react-redux'
import configureStore from './store'
import App from './App';

const AppWithProvider = () => (
  <Provider store={configureStore()}>
    <App />
  </Provider>
);


export default AppWithProvider

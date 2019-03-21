import React from 'react';
import {render} from 'react-dom';
import App from './AppInput';
import * as serviceWorker from './serviceWorker';

render(
  <div>
    <App/>
  </div>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

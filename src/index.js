import React from 'react';
import {render} from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

render(
  <div>
    <App color='#FFF' onChange={({hex})=>console.log('App1', hex)}/>
    <App color='#4458' onChange={({hex})=>console.log('App2', hex)}/>
    <div>
      <button onClick={()=>this.setState({button1: !this.state.button})}>Button 1</button>
    </div>
    { this.state.button1 &&  <App color='#CCA365' onChange={({hex})=>console.log('App3', hex)} />}
  </div>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

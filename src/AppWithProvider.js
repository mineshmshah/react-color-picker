import React from 'react';
import { Provider } from 'react-redux'
import configureStore from './store'
import App from './App';

class AppWithProvider extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      button1 : false
    }
  }

  render() {
    return(
      <div>
        <Provider store={configureStore()}>
          <App />
        </Provider>
        <Provider store={configureStore()}>
          <App />
        </Provider>
        <div>
          <button onClick={()=>this.setState({button1: !this.state.button})}>Button 1</button>
        </div>
        { this.state.button1 &&  <Provider store={configureStore()}>
          <App />
        </Provider>}
      </div>
    )
  }
}

export default AppWithProvider

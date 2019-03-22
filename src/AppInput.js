import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types'
import Color from './color'
import configureStore from './store'


class App extends Component {
  constructor(props){
    super(props);
    // https://redux.js.org/recipes/isolating-redux-sub-apps
    this.store = configureStore()
    this.state = {
      color: '#654645'
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <div style={{backgroundColor: this.state.color, height: '50px', width: '50px'}}/>
        <input value={this.state.color} onChange={e => this.setState({color: e.target.value})}/>
        <Color
          color={this.state.color}
          onChange={({hex})=>this.setState({color: hex})}
        />
      </Provider>
    );
  }
}

export default App;

App.propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

App.defaultProps = {
  color: '#4588DD',
};

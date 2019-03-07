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
  }

  render() {
    return (
      <Provider store={this.store}>
        <Color
          onChange={this.props.onChange}
          color={this.props.color}
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

import React, { Component } from 'react';
import './App.css';
import Color from './color'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      bg: '#FFF'
    }
  }

  render() {
    return (
      <div className="App" style={{backgroundColor:this.state.bg}}>
        <Color
          onChange={({hex})=> this.setState({bg:hex})}
          color="#00B9FC"
        />
      </div>
    );
  }
}

export default App;

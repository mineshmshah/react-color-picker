import React, { Component } from 'react';

class Color extends Component {
  constructor(props){
    super(props)
    this.state = {
      r: 0,
      g : 0,
      b: 0,
      a: 0,
      hue: 0,
      saturation: 0,
      value: 0,
      lightness: 0,
      format: 'HSV'
    }
  }
}

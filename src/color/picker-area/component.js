import React, { Component } from 'react';
import { PickerAreaComponent, PickerComponent } from './styles'
import store from './enhancer/connect'

class PickerArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickerPosition: {
        x: '45%',
        y: '45%'
      }
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const pickerOffset = 6;
    const size = e.currentTarget.clientWidth;
    let X =e.pageX - e.currentTarget.offsetLeft - 1;
    let Y =e.pageY - e.currentTarget.offsetTop - 1;
    if (X > size) X = size;
    if (Y > size) Y = size;
    if (X < 0) X = 0;
    if (Y < 0) Y = 0;


    const newX = X - pickerOffset;
    const newY = Y - pickerOffset;
    this.setState(() => ({
      pickerPosition: {
        x:`${newX}px`,
        y:`${newY}px`
      }
    }))
  }


  render(){
    const {r, g, b, a, areaWidth, areaHeight, format} = this.props
    return(
      <PickerAreaComponent
        red={r}
        green={g}
        blue={b}
        areaWidth={areaWidth}
        areaHeight={areaHeight}
        format={format}
        onClick={this.handleClick}
      >
        <PickerComponent onClick={null} pickerPosition={this.state.pickerPosition} />
      </PickerAreaComponent>
    )
  }

}

export default store(PickerArea)

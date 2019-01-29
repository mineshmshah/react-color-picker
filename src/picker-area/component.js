import React, { Component } from 'react';
import { PickerAreaComponent, PickerComponent } from './styles'

class PickerArea extends Component {
  constructor(props){
    super(props)
    this.state = {
      format: 'HSV',
      color: 'red',
      pickerPosition: {
        x:'45%',
        y:'45%'
      }
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const pickerOffset = 7;
    const size = e.currentTarget.clientWidth;
    let X =e.clientX - e.currentTarget.offsetLeft;
    let Y =e.clientY - e.currentTarget.offsetTop;
    if (X > size) X = size;
    if (Y > size) Y = size;
    if (X < 0) X = 0;
    if (Y < 0) Y = 0;

    const newX = X - pickerOffset;
    const newY = Y - pickerOffset;
    console.log(`x:${X}, y:${Y}`)
    this.setState(() => ({
      pickerPosition: {
        x:`${newX}px`,
        y:`${newY}px`
      }
    }))
  }

  render(){
    return(
      <PickerAreaComponent
        baseColor={this.state.color}
        format={this.state.format}
        onClick={this.handleClick}
      >
        <PickerComponent onClick={null} pickerPosition={this.state.pickerPosition} />
      </PickerAreaComponent>
    )
  }

}

export default PickerArea

import React, { Component } from 'react';
import { PickerAreaComponent, PickerComponent } from './styles'

class PickerArea extends Component {
  constructor(props){
    super(props)
    this.state = {
      format: 'HSL',
      color: 'red'
    }
  }

  render(){
    return(
      <PickerAreaComponent baseColor={this.state.color} format={this.state.format}>
        <PickerComponent/>
      </PickerAreaComponent>
    )
  }

}

export default PickerArea

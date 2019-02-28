import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { NumericalInput, Label, InputComponent,InputBox } from'./styles'
import store from './enhancer/connect'

class HexComponent extends Component {

  constructor(props){
    super(props)
    this.updateInputValues = this.updateInputValues.bind(this)
  }

  componentDidMount(){
    this.updateInputValues()
  }

  componentDidUpdate(prevProps){
    this.updateInputValues (prevProps)
  }

  updateInputValues (prevProps){
    const {hex} = this.props;
    const {updateHexInputValue} = this.props.hexInputActions;
    if(prevProps){
      if(this.props.hex !== prevProps.hex) updateHexInputValue(hex);
    } else {
      updateHexInputValue(hex);
    }
  }

  render() {
    const {hexInput} = this.props;
    const {updateHexInputValue, validateHexInput} = this.props.hexInputActions
    return(
      <InputComponent>
        <InputBox>
          <NumericalInput
            id='hexInput'
            value={hexInput}
            onChange={event => updateHexInputValue(event.target.value)}
            onBlur={()=> validateHexInput()}
          />
          <Label htmlFor="aInput">HEX</Label>
        </InputBox>

      </InputComponent>
    )
  }
}

export default store(HexComponent)

HexComponent.propTypes ={
  hexInputActions: PropTypes.objectOf(PropTypes.func),
  hex: PropTypes.string,
  hexInput:  PropTypes.oneOfType([
    PropTypes.string,
  ]),
};

HexComponent.defaultProps ={
  hexInputActions: {},
  hex: "#FF0000",
  hexInput: "#FF0000",
};

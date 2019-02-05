import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { NumericalInput, Label, InputComponent,InputBox } from'./styles'
import store from './enhancer/connect'

class RGBComponent extends Component {

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
    const {r, g, b} = this.props;
    const {updateRInputValue, updateGInputValue, updateBInputValue} = this.props.rgbInputActions;
    if(prevProps){
      if(this.props.r !== prevProps.r) updateRInputValue(r);
      if(this.props.g !== prevProps.g) updateGInputValue(g);
      if(this.props.b !== prevProps.b) updateBInputValue(b);
    } else {
      updateRInputValue(r);
      updateGInputValue(g);
      updateBInputValue(b);
    }
  }

  render() {
    const {rInput, gInput, bInput} = this.props;
    const {updateRInputValue, updateGInputValue, updateBInputValue ,validateRGBInput} = this.props.rgbInputActions
    return(
      <InputComponent>
        <InputBox>
          <Label htmlFor="rInput">R </Label>
          <NumericalInput
            id='rInput'
            value={rInput}
            onChange={event => updateRInputValue(event.target.value)}
            onBlur={()=> validateRGBInput('r',0, 255)}
          />
        </InputBox>
        <InputBox>
          <Label htmlFor="gInput">G</Label>
          <NumericalInput
            id='gInput'
            value={gInput}
            onChange={event => updateGInputValue(event.target.value)}
            onBlur={()=> validateRGBInput('g',0, 255)}
          />
        </InputBox>
        <InputBox>
          <Label htmlFor="bInput">B</Label>
          <NumericalInput
            id='bInput'
            value={bInput}
            onChange={event => updateBInputValue(event.target.value)}
            onBlur={()=> validateRGBInput('b',0, 255)}
          />
        </InputBox>
      </InputComponent>
    )
  }
}

export default store(RGBComponent)

RGBComponent.propTypes ={
  rgbInputActions: PropTypes.objectOf(PropTypes.func),
  r: PropTypes.number,
  g: PropTypes.number,
  b: PropTypes.number,
  rInput:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  gInput: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  bInput: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

RGBComponent.defaultProps ={
  rgbInputActions: {},
  r: 255,
  g: 0,
  b: 0,
  rInput: 255,
  gInput: 0,
  bInput: 0,
}

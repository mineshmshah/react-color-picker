import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { NumericalInput, Label, InputComponent,InputBox } from'./styles'
import store from './enhancer/connect'

class HSXComponent extends Component {

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
    const {h, sv, sl, l ,v} = this.props;
    const {updateHInputValue, updateSVInputValue, updateSLInputValue, updateLInputValue, updateVInputValue} = this.props.hsxInputActions;
    if(prevProps){
      if(this.props.h !== prevProps.h) updateHInputValue(h);
      if(this.props.sv !== prevProps.sv) updateSVInputValue(sv);
      if(this.props.sl !== prevProps.sl) updateSLInputValue(sl);
      if(this.props.l !== prevProps.l) updateLInputValue(l);
      if(this.props.v !== prevProps.v) updateVInputValue(v);
    } else {
      updateHInputValue(h);
      updateSVInputValue(sv);
      updateSLInputValue(sl);
      updateLInputValue(l);
      updateVInputValue(v);
    }
  }


  render() {
    const {hInput, svInput, slInput, lInput, vInput, format} = this.props;
    const {updateHInputValue, updateSVInputValue, updateSLInputValue, updateLInputValue, updateVInputValue ,validateHSXInput} = this.props.hsxInputActions;
    const hsvFormat = format === 'HSV';
    return(
      <InputComponent>
        <InputBox>
          <NumericalInput
            id='hInput'
            value={hInput}
            onChange={event => updateHInputValue(event.target.value)}
            onBlur={()=> validateHSXInput('h',0, 359, format)}
          />
          <Label htmlFor="hInput">H </Label>
        </InputBox>
        <InputBox>
          <NumericalInput
            id={hsvFormat ? 'svInput' : 'slInput'}
            value={hsvFormat ? svInput : slInput}
            onChange={event => hsvFormat ? updateSVInputValue(event.target.value) : updateSLInputValue(event.target.value)}
            onBlur={()=> hsvFormat ? validateHSXInput('sv',0, 100, format) : validateHSXInput('sl',0, 100, format)}
          />
          <Label htmlFor={hsvFormat ? 'svInput' : 'slInput'}>S</Label>
        </InputBox>
        <InputBox>
          <NumericalInput
            id={hsvFormat ? 'vInput' : 'lInput'}
            value={hsvFormat ? vInput : lInput}
            onChange={event => hsvFormat ? updateVInputValue(event.target.value) : updateLInputValue(event.target.value)}
            onBlur={()=> hsvFormat ? validateHSXInput('v',0, 100, format) : validateHSXInput('l',0, 100, format)}
          />
          <Label htmlFor={hsvFormat ? 'vInput' : 'lInput'}>{hsvFormat ? 'V' : 'L'}</Label>
        </InputBox>
      </InputComponent>
    )
  }
}

export default store(HSXComponent)

HSXComponent.propTypes ={
  hsxInputActions: PropTypes.objectOf(PropTypes.func),
  h: PropTypes.number,
  sv: PropTypes.number,
  sl: PropTypes.number,
  l: PropTypes.number,
  v: PropTypes.number,
  hInput:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  svInput: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  slInput: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  lInput: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  vInput: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  format: PropTypes.string
};

HSXComponent.defaultProps ={
  hsxInputActions: {},
  h: 0,
  sv: 100,
  sl:100,
  l: 50,
  v: 100,
  hInput: 0,
  svInput: 100,
  slInput: 100,
  lInput: 50,
  vInput: 100,
  format: 'HSL'
};

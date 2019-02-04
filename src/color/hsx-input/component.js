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
    const {h, s, l ,v} = this.props;
    const {updateHInputValue, updateSInputValue, updateLInputValue, updateVInputValue} = this.props.hsxInputActions;
    if(prevProps){
      if(this.props.h !== prevProps.h) updateHInputValue(h);
      if(this.props.s !== prevProps.s) updateSInputValue(s);
      if(this.props.l !== prevProps.l) updateLInputValue(l);
      if(this.props.v !== prevProps.v) updateVInputValue(v);
    } else {
      updateHInputValue(h);
      updateSInputValue(s);
      updateLInputValue(l);
      updateVInputValue(v);
    }
  }


  render() {
    const {hInput, sInput, lInput, vInput, format} = this.props;
    const {updateHInputValue, updateSInputValue, updateLInputValue, updateVInputValue ,validateHSXInput} = this.props.hsxInputActions;
    const hsvFormat = format === 'HSV';
    return(
      <InputComponent>
        <InputBox>
          <Label htmlFor="hInput">H </Label>
          <NumericalInput
            id='hInput'
            value={hInput}
            onChange={event => updateHInputValue(event.target.value)}
            onBlur={()=> validateHSXInput('h',0, 359)}
          />
        </InputBox>
        <InputBox>
          <Label htmlFor="sInput">S</Label>
          <NumericalInput
            id='sInput'
            value={sInput}
            onChange={event => updateSInputValue(event.target.value)}
            onBlur={()=> validateHSXInput('s',0, 100)}
          />
        </InputBox>
        <InputBox>
          <Label htmlFor={hsvFormat ? 'vInput' : 'lInput'}>{hsvFormat ? 'V' : 'L'}</Label>
          <NumericalInput
            id={hsvFormat ? 'vInput' : 'lInput'}
            value={hsvFormat ? vInput : lInput}
            onChange={event => hsvFormat ? updateVInputValue(event.target.value) : updateLInputValue(event.target.value)}
            onBlur={()=> hsvFormat ? validateHSXInput('v',0, 100) : validateHSXInput('l',0, 100)}
          />
        </InputBox>
      </InputComponent>
    )
  }
}

export default store(HSXComponent)

HSXComponent.propTypes ={
  hsxInputActions: PropTypes.objectOf(PropTypes.func),
  h: PropTypes.number,
  s: PropTypes.number,
  l: PropTypes.number,
  v: PropTypes.number,
  hInput:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  sInput: PropTypes.oneOfType([
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
  s: 0,
  l: 0,
  v: 0,
  hInput: 0,
  sInput: 0,
  lInput: 0,
  vInput: 0,
  format: 'HSV'
};

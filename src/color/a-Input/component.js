import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { NumericalInput, Label, InputComponent,InputBox } from'./styles'
import store from './enhancer/connect'

class AComponent extends Component {

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
    const {a} = this.props;
    const {updateAInputValue} = this.props.aInputActions;
    if(prevProps){
      if(this.props.a !== prevProps.a) updateAInputValue(a);
    } else {
      updateAInputValue(a);
    }
  }

  render() {
    const {aInput} = this.props;
    const {updateAInputValue, validateAInput} = this.props.aInputActions
    return(
      <InputComponent>
        <InputBox>
          <NumericalInput
            id='aInput'
            value={aInput}
            onChange={event => updateAInputValue(event.target.value)}
            onBlur={()=> validateAInput()}
          />
          <Label htmlFor="aInput">A</Label>
        </InputBox>

      </InputComponent>
    )
  }
}

export default store(AComponent)

AComponent.propTypes ={
  aInputActions: PropTypes.objectOf(PropTypes.func),
  a: PropTypes.string,
  aInput:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

AComponent.defaultProps ={
  aInputActions: {},
  a: "1.00",
  aInput: "1.00",
};

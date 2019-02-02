import React  from 'react';
import { NumericalInput, Label, Component,InputBox } from'./styles'


const AComponent=({
  a, aInput,
  actions
}) =>(
  <Component>
    <InputBox>
      <Label htmlFor="aInput">A </Label>
      <NumericalInput
        id='aInput'
        value={aInput}
        onChange={event => actions.updateAInputValue(event.target.value)}
        onBlur={()=> actions.updateAValue()}
      />
    </InputBox>
  </Component>
)

export default AComponent


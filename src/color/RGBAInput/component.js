import React  from 'react';
import { NumericalInput, Label, Component,InputBox } from'./styles'

const RGBComponent = ({
  r, rInput,
  g, gInput,
  b, bInput,
  actions
}) =>(
  <Component>
    <InputBox>
      <Label htmlFor="rInput">R </Label>
      <NumericalInput
        id='rInput'
        value={rInput}
        onChange={event => actions.updateRInputValue(event.target.value)}
        onBlur={()=> actions.updateRValue()}
      />
    </InputBox>
    <InputBox>
      <Label htmlFor="gInput">G</Label>
      <NumericalInput
        id='gInput'
        value={gInput}
        onChange={event => actions.updateGInputValue(event.target.value)}
        onBlur={()=> actions.updateGValue()}
      />
    </InputBox>
    <InputBox>
      <Label htmlFor="bInput">B</Label>
      <NumericalInput
        id='bInput'
        value={bInput}
        onChange={event => actions.updateBInputValue(event.target.value)}
        onBlur={()=> actions.updateBValue()}
      />
    </InputBox>
  </Component>
)

export default RGBComponent
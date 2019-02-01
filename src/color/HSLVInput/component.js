import React  from 'react';
import { NumericalInput, Label, Component,InputBox } from'./styles'


const HSLVComponent=({
  h, hInput,
  s, sInput,
  l, lInput,
  v, vInput,
  actions
}) =>(
  <Component>
    <InputBox>
      <Label htmlFor="hInput">H </Label>
      <NumericalInput
        id='hInput'
        value={hInput}
        onChange={event => actions.updateHInputValue(event.target.value)}
        onBlur={()=> actions.updateHValue()}
      />
    </InputBox>
    <InputBox>
      <Label htmlFor="sInput">S</Label>
      <NumericalInput
        id='sInput'
        value={sInput}
        onChange={event => actions.updateSInputValue(event.target.value)}
        onBlur={()=> actions.updateSValue()}
      />
    </InputBox>
    <InputBox>
      <Label htmlFor="lInput">L</Label>
      <NumericalInput
        id='lInput'
        value={lInput}
        onChange={event => actions.updateLInputValue(event.target.value)}
        onBlur={()=> actions.updateLValue()}
      />
    </InputBox>
    <InputBox>
      <Label htmlFor="vInput">V</Label>
      <NumericalInput
        id='vInput'
        value={vInput}
        onChange={event => actions.updateVInputValue(event.target.value)}
        onBlur={()=> actions.updateVValue()}
      />
    </InputBox>
  </Component>
)

export default HSLVComponent


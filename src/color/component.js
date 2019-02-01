import React  from 'react';
import PickerArea from '../picker-area'
import RGBAInput from './RGBAInput'
import store from './enhancer/connect'

export default store(
  ({
    r, rInput,
    g, gInput,
    b, bInput,
    h, hInput,
    s, sInput,
    l, lInput,
    v, vInput,
    a, aInput,
    actions
  }) =>(
    <div>

      <div>
        <label htmlFor="hInput">H
          <input
            id='hInput'
            value={hInput}
            onChange={event => actions.updateHInputValue(event.target.value)}
            onBlur={()=> actions.updateHValue()}
          />
        </label>
        <label htmlFor="sInput">S
          <input
            id='sgInput'
            value={sInput}
            onChange={event => actions.updateSInputValue(event.target.value)}
            onBlur={()=> actions.updateSValue()}
          />
        </label>
        <label htmlFor="lInput">L
          <input
            id='lInput'
            value={lInput}
            onChange={event => actions.updateLInputValue(event.target.value)}
            onBlur={()=> actions.updateLValue()}
          />
        </label>
        <label htmlFor="vInput">V
          <input
            id='vInput'
            value={vInput}
            onChange={event => actions.updateVInputValue(event.target.value)}
            onBlur={()=> actions.updateVValue()}
          />
        </label>
      </div>
      <div>
        <label htmlFor="aInput">A
          <input
            id='aInput'
            value={aInput}
            onChange={event => actions.updateAInputValue(event.target.value)}
            onBlur={()=> actions.updateAValue()}
          />
        </label>
      </div>
      <PickerArea/>
      <RGBAInput
        {...{r}}
        {...{g}}
        {...{b}}
        {...{rInput}}
        {...{gInput}}
        {...{bInput}}
        {...{actions}}
      />
    </div>
  )
)


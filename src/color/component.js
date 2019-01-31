import React, { Component } from 'react';
import PickerArea from '../picker-area'
import store from './enhancer/connect'

export default store(
  ({
    rInput,
    actions
  }) =>(
    <div>
      <div>
        <label>r</label>
        <input
          value={rInput}
          onChange={event => actions.updateRInputValue(event.target.value)}
          onBlur={()=> actions.updateRValue()}
        />
      </div>
      <PickerArea/>
    </div>
  )
)


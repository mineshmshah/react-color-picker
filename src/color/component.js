import React  from 'react';
import PickerArea from './picker-area'
import RGBInput from './RGBInput'
import HSLVInput from './HSLVInput'
import AInput from './AInput'
import store from './enhancer/connect'

const Color =  ({
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
    <PickerArea/>
    <RGBInput
      {...{r}}
      {...{g}}
      {...{b}}
      {...{rInput}}
      {...{gInput}}
      {...{bInput}}
      {...{actions}}
    />
    <HSLVInput
      {...{h}}
      {...{s}}
      {...{l}}
      {...{v}}
      {...{hInput}}
      {...{sInput}}
      {...{lInput}}
      {...{vInput}}
      {...{actions}}
    />
    <AInput
      {...{a}}
      {...{aInput}}
      {...{actions}}
    />
  </div>
)


export default store(Color)
import React  from 'react';
import PickerArea from './picker-area'
import RGBInput from './rgb-Input'
import HSXInput from './hsx-input'
import AInput from './a-Input'
import HSXButton from './HSXButton'
import HueSlider from './hue-slider'
import store from './enhancer/connect'

const Color =  ({
  r, g, b, a, h, s, l, v, aInput, actions, format
}) =>(
  <div>
    <PickerArea/>
    <RGBInput
      {...{r}}
      {...{g}}
      {...{b}}
      {...{actions}}
    />
    <HSXInput
      {...{h}}
      {...{s}}
      {...{l}}
      {...{v}}
      {...{actions}}
      {...{format}}
    />
    <AInput
      {...{a}}
      {...{actions}}
    />
    <HSXButton
      {...{format}}
      {...{actions}}
    />
    <HueSlider
      {...{h}}
      {...{actions}}
      areaWidth={200}
    />
  </div>
)


export default store(Color)

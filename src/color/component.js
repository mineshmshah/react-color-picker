import React  from 'react';
import PickerArea from './picker-area'
import RGBInput from './rgb-Input'
import HSXInput from './hsx-input'
import AInput from './a-Input'
import HSXButton from './hsx-button'
import HueSlider from './hue-slider'
import AlphaSlider from './alpha-slider'
import store from './enhancer/connect'
import HexInput from './hex-Input'

const Color =  ({
  r, g, b, a, h, sl, sv, l, v, hex, actions, format
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
      {...{sl}}
      {...{sv}}
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
    <AlphaSlider
      {...{h}}
      {...{sl}}
      {...{l}}
      {...{a}}
      {...{actions}}
      areaWidth={200}
    />
    <HexInput
      {...{hex}}
      {...{actions}}
    />
  </div>
)


export default store(Color)

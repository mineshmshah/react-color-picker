import React  from 'react';
import PickerArea from './picker-area'
import RGBInput from './rgb-Input'
import HSXInput from './hsx-input'
import AInput from './a-Input'
import HSXButton from './hsx-button'
import HueSlider from './hue-slider'
import HueSliderVertical from './hue-slider-vertical'
import AlphaSlider from './alpha-slider'
import AlphaSliderVertical from './alpha-slider-vertical'
import store from './enhancer/connect'
import HexInput from './hex-Input'
import CurrentColor from './current-color'

import {
  Container,
  AreaAndSliderContainer,
  RGBAHexInputContainer,
  HSVInputAndButtonContainer,
  HorizontalSliderContainer,
  PreviewContainer
} from './styles';

const Color =  ({
  r, g, b, a, h, sl, sv, l, v, hex, actions, format
}) =>(
  <Container>
    <AreaAndSliderContainer>
      <PickerArea
        {...{h}}
        {...{sl}}
        {...{sv}}
        {...{l}}
        {...{v}}
        {...{format}}
        {...{actions}}
        areaWidth={200}
        areaHeight={200}
      />
      <HueSliderVertical
        {...{h}}
        areaHeight={200}
      />
      <AlphaSliderVertical
        {...{h}}
        {...{sl}}
        {...{l}}
        {...{a}}
        {...{actions}}
        areaHeight={200}
      />
    </AreaAndSliderContainer>
    <RGBAHexInputContainer>
      <HexInput
        {...{hex}}
        {...{actions}}
      />
      <RGBInput
        {...{r}}
        {...{g}}
        {...{b}}
        {...{actions}}
      />
      <AInput
        {...{a}}
        {...{actions}}
      />
    </RGBAHexInputContainer>
    <HSVInputAndButtonContainer>
      <HSXInput
        {...{h}}
        {...{sl}}
        {...{sv}}
        {...{l}}
        {...{v}}
        {...{actions}}
        {...{format}}
      />
      <HSXButton
        {...{format}}
        {...{actions}}
      />
    </HSVInputAndButtonContainer>
    <HorizontalSliderContainer>
      <HueSlider
        {...{h}}
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
    </HorizontalSliderContainer>

    <PreviewContainer>
      <CurrentColor
        {...{h}}
        {...{sl}}
        {...{l}}
        {...{a}}
      />
    </PreviewContainer>
  </Container>
);

export default store(Color)


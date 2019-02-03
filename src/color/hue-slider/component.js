import React from 'react'
import store from './enhancer/connect'
import { Component , SliderBox, PickerSlider } from "./styles";

const hueAreaWidth = 198;

const HueSlider = ({h,hueSliderActions,huePosition}) => (
  <Component>
    <SliderBox areaWidth={hueAreaWidth} >
      <PickerSlider sliderX={huePosition} sliderPostion={hueSliderActions.updateHueSliderPosition(h,hueAreaWidth)}/>
    </SliderBox>
  </Component>
);

export default store(HueSlider);

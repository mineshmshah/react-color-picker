import React from 'react'
import store from './enhancer/connect'
import { Component , SliderBox } from "./styles";

const HueSlider = () => (
  <Component>
    <SliderBox/>
  </Component>
);

export default store(HueSlider);

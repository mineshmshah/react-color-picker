import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import store from './enhancer/connect'
import { HueSliderComponent , SliderBox, PickerSlider } from "./styles";

const positionFunction = (value, length) => (value * length) /359;

const useSliderPosition = (value, length, posFunc) => {
  const [position, setPosition] = useState(0);
  useEffect(()=> {
    const newPosition = positionFunction(value,length)
    setPosition(newPosition)
  },
  [value, length]
  );
  return position
};

const HueSliderVerticalHooks = ({h, areaHeight, hueSliderVerticalHooksActions}) => {
  // const [position, setPosition] = useState(0);
  //
  // useEffect(()=> {
  //   const newPosition = (h * areaHeight) /359;
  //   setPosition(newPosition)
  // },
  // [h, areaHeight]
  // );

  const position = useSliderPosition(h, areaHeight, positionFunction);

  const updateHValueWithSlider = (e, sliderAreaOffset) => {
    let yValue =e.clientY + sliderAreaOffset;
    if (yValue > areaHeight) yValue = areaHeight;
    if (yValue < 0) yValue = 0;
    const hue = Math.round((yValue/areaHeight) * 359);
    hueSliderVerticalHooksActions.updateColorsWithHueSliderVerticalHooks(hue);
  };

  const mouseDownEvent = e => {
    const currentElement = e.currentTarget;
    const boundingBox = currentElement.getBoundingClientRect();
    const sliderAreaOffset = currentElement.scrollTop - boundingBox.top;
    updateHValueWithSlider(e, sliderAreaOffset);
    const HUpdaterFunction = event => updateHValueWithSlider(event, sliderAreaOffset);
    document.addEventListener('mousemove',  HUpdaterFunction) ;
    document.addEventListener('mouseup', () =>
      document.removeEventListener('mousemove', HUpdaterFunction))
  };
  return(
    <HueSliderComponent>
      <SliderBox areaHeight={areaHeight} onMouseDown={e=> mouseDownEvent(e)} >
        <PickerSlider sliderY={position}/>
      </SliderBox>
    </HueSliderComponent>
  )
};

export default store(HueSliderVerticalHooks);


HueSliderVerticalHooks.propTypes = {
  hueSliderVerticalHooksActions: PropTypes.objectOf(PropTypes.func),
  h: PropTypes.number,
  areaHeight:PropTypes.number,
};

HueSliderVerticalHooks.defaultProps = {
  hueSliderVerticalHooksActions: {},
  h: 0,
  areaHeight:160,
};

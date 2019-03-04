import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import store from './enhancer/connect'
import { HueSliderComponent , SliderBox, PickerSlider } from "./styles";

const HueSliderVerticalHooks = ({h, areaHeight, hueSliderVerticalHooksActions}) => {
  const [position, setPosition] = useState(0);

  useEffect(()=> {
    const newPosition = (h * areaHeight) /360;
    setPosition(newPosition)
  },
  [h, areaHeight]
  );

  const updateHValueWithSlider = (e, sliderAreaOffset) => {
    let yValue =e.pageY - sliderAreaOffset;
    if (yValue > areaHeight) yValue = areaHeight;
    if (yValue < 0) yValue = 0;
    const hue = Math.round((yValue/areaHeight) * 359);
    hueSliderVerticalHooksActions.updateColorsWithHueSliderVerticalHooks(hue);
  };

  const mouseDownEvent = e => {
    const sliderAreaOffset = e.currentTarget.offsetTop;
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

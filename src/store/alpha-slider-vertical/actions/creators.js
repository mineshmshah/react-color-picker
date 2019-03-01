import alphaSliderVerticalTypes from './types'

export const updateAlphaSliderPositionVertical = (value, areaHeight) => (
  {
    type: alphaSliderVerticalTypes.UPDATE_ALPHA_POSITION_VERTICAL,
    value,
    areaHeight
  }
);

export const validateAlphaValueVerticalSlider = value => (
  {
    type: alphaSliderVerticalTypes.VALIDATE_ALPHA_VALUE_VERTICAL_SLIDER,
    value
  }
);



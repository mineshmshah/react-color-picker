import alphaSliderTypes from './types'

export const updateAlphaSliderPosition = (value, areaWidth) => (
  {
    type: alphaSliderTypes.UPDATE_ALPHA_POSITION,
    value,
    areaWidth
  }
);

export const validateAlphaValueWithSlider = value => (
  {
    type: alphaSliderTypes.VALIDATE_ALPHA_VALUE_WITH_SLIDER,
    value
  }
);


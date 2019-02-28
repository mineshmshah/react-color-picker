import alphaSliderTypes from './types'

export const updateAlphaSliderPositionVertical = (value, areaHeight) => (
  {
    type: alphaSliderTypes.UPDATE_ALPHA_POSITION_VERTICAL,
    value,
    areaHeight
  }
);

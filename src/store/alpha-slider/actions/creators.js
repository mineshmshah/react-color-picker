import alphaSliderTypes from './types'

export const updateAlphaSliderPosition = (value, areaWidth) => (
  {
    type: alphaSliderTypes.UPDATE_ALPHA_POSITION,
    value,
    areaWidth
  }
);

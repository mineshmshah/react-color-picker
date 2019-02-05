import hueSliderTypes from './types'

export const updateHueSliderPosition = (value, areaWidth) => (
  {
    type: hueSliderTypes.UPDATE_HUE_POSITION,
    value,
    areaWidth
  }
);

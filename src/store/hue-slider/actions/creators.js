import hueSliderTypes from './types'

export const updateHueSliderPosition = (value, areaWidth) => (
  {
    type: hueSliderTypes.UPDATE_POSITION,
    value,
    areaWidth
  }
);

export const updateHueValue = value  => (
  {
    type: hueSliderTypes.UPDATE_HUE,
    value,
  }
);

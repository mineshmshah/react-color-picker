import hueSliderTypes from './types'

export const updateHueSliderPosition = value => (
  {
    type: hueSliderTypes.UPDATE_POSITION,
    value
  }
);

export const updateHueValue = value => (
  {
    type: hueSliderTypes.UPDATE_HUE,
    value
  }
);

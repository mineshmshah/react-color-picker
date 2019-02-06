import hueSliderTypes from './types'

export const updateHueSliderPosition = (value, areaWidth) => (
  {
    type: hueSliderTypes.UPDATE_HUE_POSITION,
    value,
    areaWidth
  }
);

export const updateColorsWithHueSlider = (value, areaWidth) => (
  {
    type: hueSliderTypes.UPDATE_COLORS_WITH_HUE_SLIDER,
    value
  }
);

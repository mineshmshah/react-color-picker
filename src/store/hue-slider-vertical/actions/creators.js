import hueSliderTypesVertical from './types'

export const updateHueSliderPositionVertical = (value, areaHeight) => (
  {
    type: hueSliderTypesVertical.UPDATE_HUE_POSITION_VERTICAL,
    value,
    areaHeight
  }
);

export const updateColorsWithHueSliderVertical = value => (
  {
    type: hueSliderTypesVertical.UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL,
    value
  }
);

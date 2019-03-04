import hueSliderTypesVerticalHooks from './types'

export const updateHueSliderPositionVerticalHooks = (value, areaHeight) => (
  {
    type: hueSliderTypesVerticalHooks.UPDATE_HUE_POSITION_VERTICAL_HOOKS,
    value,
    areaHeight
  }
);

export const updateColorsWithHueSliderVerticalHooks = value => (
  {
    type: hueSliderTypesVerticalHooks.UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL_HOOKS,
    value
  }
);

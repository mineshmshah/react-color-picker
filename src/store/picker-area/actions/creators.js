import pickerAreaTypes from './types'

export const updateColorPickerAreaPosition = (sv,v,sl,l, areaWidth, areaHeight, format) => (
  {
    type: pickerAreaTypes.UPDATE_COLOR_PICKER_AREA_POSITION,
    sv,
    v,
    sl,
    l,
    areaWidth,
    areaHeight,
    format
  }
);

export const updateColorsWithPickerArea = (xValue, yValue, format) => (
  {
    type: pickerAreaTypes.UPDATE_COLORS_WITH_PICKER_AREA,
    xValue,
    yValue,
    format
  }
);

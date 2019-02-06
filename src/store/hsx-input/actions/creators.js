import rgbInputTypes from './types'

export const updateHInputValue = value =>  (
  {
    type: rgbInputTypes.UPDATE_H_INPUT,
    value
  }
);

export const updateSVInputValue = value =>  (
  {
    type: rgbInputTypes.UPDATE_SV_INPUT,
    value
  }
);

export const updateSLInputValue = value =>  (
  {
    type: rgbInputTypes.UPDATE_SL_INPUT,
    value
  }
);

export const updateVInputValue = value =>  (
  {
    type: rgbInputTypes.UPDATE_V_INPUT,
    value
  }
);

export const updateLInputValue = value =>  (
  {
    type: rgbInputTypes.UPDATE_L_INPUT,
    value
  }
);
export const validateHSXInput = (value, min, max, format) => (
  {
    type:rgbInputTypes.VALIDATE_HSX_INPUT,
    value,
    min,
    max,
    format
  }
);

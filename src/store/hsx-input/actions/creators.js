import rgbInputTypes from './types'

export const updateHInputValue = value =>  (
  {
    type: rgbInputTypes.UPDATE_H_INPUT,
    value
  }
);

export const updateSInputValue = value =>  (
  {
    type: rgbInputTypes.UPDATE_S_INPUT,
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
export const validateHSXInput = (value, min, max) => (
  {
    type:rgbInputTypes.VALIDATE_HSX_INPUT,
    value,
    min,
    max
  }
);

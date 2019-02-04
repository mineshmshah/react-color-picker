import rgbInputTypes from './types'

export const updateRInputValue = value =>  (
  {
    type: rgbInputTypes.UPDATE_R_INPUT,
    value
  }
);

export const updateGInputValue = value =>  (
  {
    type: rgbInputTypes.UPDATE_G_INPUT,
    value
  }
);

export const updateBInputValue = value =>  (
  {
    type: rgbInputTypes.UPDATE_B_INPUT,
    value
  }
);

export const validateRGBInput = (value, min, max) => (
  {
    type:rgbInputTypes.VALIDATE_RGB_INPUT,
    value,
    min,
    max
  }
);

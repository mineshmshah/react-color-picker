import hexInputTypes from './types'

export const updateHexInputValue = value =>  (
  {
    type: hexInputTypes.UPDATE_HEX_INPUT,
    value
  }
);

export const validateHexInput = () => (
  {
    type: hexInputTypes.VALIDATE_HEX_INPUT,
    value
  }
);

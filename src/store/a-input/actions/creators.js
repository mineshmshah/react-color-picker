import aInputTypes from './types'

export const updateAInputValue = value =>  (
  {
    type: aInputTypes.UPDATE_A_INPUT,
    value
  }
);

export const validateAInput = () => (
  {
    type:aInputTypes.VALIDATE_A_INPUT,
  }
);
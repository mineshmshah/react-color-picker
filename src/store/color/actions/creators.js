import colorTypes from './types'

export const updateRValue = value =>  (
  {
    type: colorTypes.UPDATE_R,
    // value
  }
);

export const updateRInputValue = value =>  (
  {
    type: colorTypes.UPDATE_R_INPUT,
    value
  }
);

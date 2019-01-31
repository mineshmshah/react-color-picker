import colorTypes from './types'

export const updateRValue = () =>  (
  {
    type: colorTypes.UPDATE_R,
  }
);

export const updateRInputValue = value =>  (
  {
    type: colorTypes.UPDATE_R_INPUT,
    value
  }
);

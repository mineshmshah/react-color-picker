import colorTypes from './types'

export const updateRValue = value =>  (
  {
    type: colorTypes.UPDATE_R,
    value
  }
);

export const updateGValue = value =>  (
  {
    type: colorTypes.UPDATE_G,
    value
  }
);

export const updateBValue = value =>  (
  {
    type: colorTypes.UPDATE_B,
    value
  }
);


export const updateHValue = () =>  (
  {
    type: colorTypes.UPDATE_H,
  }
);

export const updateHInputValue = value =>  (
  {
    type: colorTypes.UPDATE_H_INPUT,
    value
  }
);

export const updateSValue = () =>  (
  {
    type: colorTypes.UPDATE_S,
  }
);

export const updateSInputValue = value =>  (
  {
    type: colorTypes.UPDATE_S_INPUT,
    value
  }
);

export const updateLValue = () =>  (
  {
    type: colorTypes.UPDATE_L,
  }
);

export const updateLInputValue = value =>  (
  {
    type: colorTypes.UPDATE_L_INPUT,
    value
  }
);

export const updateVValue = () =>  (
  {
    type: colorTypes.UPDATE_V,
  }
);

export const updateVInputValue = value =>  (
  {
    type: colorTypes.UPDATE_V_INPUT,
    value
  }
);

export const updateAValue = () =>  (
  {
    type: colorTypes.UPDATE_A,
  }
);

export const updateAInputValue = value =>  (
  {
    type: colorTypes.UPDATE_A_INPUT,
    value
  }
);

export const updateFormat = value =>  (
  {
    type: colorTypes.UPDATE_FORMAT,
    value
  }
);

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


export const updateHValue = value =>  (
  {
    type: colorTypes.UPDATE_H,
    value
  }
);


export const updateSVValue = value =>  (
  {
    type: colorTypes.UPDATE_SV,
    value
  }
);

export const updateSLValue = value =>  (
  {
    type: colorTypes.UPDATE_SL,
    value
  }
);

export const updateLValue = value =>  (
  {
    type: colorTypes.UPDATE_L,
    value
  }
);


export const updateVValue = value =>  (
  {
    type: colorTypes.UPDATE_V,
    value
  }
);

export const updateAValue = value =>  (
  {
    type: colorTypes.UPDATE_A,
    value
  }
);


export const updateHexValue = value =>  (
  {
    type: colorTypes.UPDATE_HEX,
    value
  }
);

export const updateFormat = value =>  (
  {
    type: colorTypes.UPDATE_FORMAT,
    value
  }
);

export const updateHSLCombo = (FinalHue, FinalSaturation, FinalLightness) =>  (
  {
    type: colorTypes.UPDATE_HSL_COMBO,
    FinalHue,
    FinalSaturation,
    FinalLightness
  }
);

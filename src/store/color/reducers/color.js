import colorTypes from '../actions/types'

export default{
  [colorTypes.UPDATE_R] : (state, {value}) => (
    {
      ...state,
      r: value
    }
  ),
  [colorTypes.UPDATE_G] : (state, {value}) => (
    {
      ...state,
      g: value
    }
  ),
  [colorTypes.UPDATE_B] : (state, {value}) => (
    {
      ...state,
      b: value
    }
  ),
  [colorTypes.UPDATE_H] : (state, {value}) => (
    {
      ...state,
      h: value
    }
  ),
  [colorTypes.UPDATE_SV] : (state, {value}) => (
    {
      ...state,
      sv: value
    }
  ),
  [colorTypes.UPDATE_SL] : (state, {value}) => (
    {
      ...state,
      sl: value
    }
  ),
  [colorTypes.UPDATE_L] : (state, {value}) => (
    {
      ...state,
      l: value
    }
  ),
  [colorTypes.UPDATE_V] : (state, {value}) => (
    {
      ...state,
      v: value
    }
  ),
  [colorTypes.UPDATE_A] : (state, {value}) => (
    {
      ...state,
      a: value
    }
  ),
  [colorTypes.UPDATE_HEX] : (state, {value}) => (
    {
      ...state,
      hex: value
    }
  ),
  [colorTypes.UPDATE_FORMAT] : (state, {value}) => (
    {
      ...state,
      format: value
    }
  ),
  [colorTypes.UPDATE_HSL_COMBO] : (state, {FinalHue, FinalSaturation, FinalLightness}) => (
    {
      ...state,
      h: FinalHue,
      sl: FinalSaturation,
      l: FinalLightness
    }
  ),
}

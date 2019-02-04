import rgbInputTypes from '../actions/types'

export default{
  [rgbInputTypes.UPDATE_R_INPUT] : (state, {value}) => (
    {
      ...state,
      r_input: value
    }
  ),
  [rgbInputTypes.UPDATE_G_INPUT] : (state, {value}) => (
    {
      ...state,
      g_input: value
    }
  ),
  [rgbInputTypes.UPDATE_B_INPUT] : (state, {value}) => (
    {
      ...state,
      b_input: value
    }
  )
}

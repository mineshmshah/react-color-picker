import colorTypes from '../actions/types'

export default{
  [colorTypes.UPDATE_R_INPUT] : (state, {value}) => (
    {
      ...state,
      r_input: value
    }
  ),
  [colorTypes.UPDATE_G_INPUT] : (state, {value}) => (
    {
      ...state,
      g_input: value
    }
  ),
  [colorTypes.UPDATE_B_INPUT] : (state, {value}) => (
    {
      ...state,
      b_input: value
    }
  )
}

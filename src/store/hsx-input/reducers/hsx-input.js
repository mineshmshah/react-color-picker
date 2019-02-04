import hsxInputTypes from '../actions/types'

export default{
  [hsxInputTypes.UPDATE_H_INPUT] : (state, {value}) => (
    {
      ...state,
      h_input: value
    }
  ),
  [hsxInputTypes.UPDATE_S_INPUT] : (state, {value}) => (
    {
      ...state,
      s_input: value
    }
  ),
  [hsxInputTypes.UPDATE_L_INPUT] : (state, {value}) => (
    {
      ...state,
      l_input: value
    }
  ),
  [hsxInputTypes.UPDATE_V_INPUT] : (state, {value}) => (
    {
      ...state,
      v_input: value
    }
  )
}

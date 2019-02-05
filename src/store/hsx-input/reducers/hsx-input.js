import hsxInputTypes from '../actions/types'

export default{
  [hsxInputTypes.UPDATE_H_INPUT] : (state, {value}) => (
    {
      ...state,
      h_input: value
    }
  ),
  [hsxInputTypes.UPDATE_SV_INPUT] : (state, {value}) => (
    {
      ...state,
      sv_input: value
    }
  ),
  [hsxInputTypes.UPDATE_SL_INPUT] : (state, {value}) => {
    return (
      {
        ...state,
        sl_input: value
      }
    );
  },
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

import aInputTypes from '../actions/types'

export default{
  [aInputTypes.UPDATE_A_INPUT] : (state, {value}) => (
    {
      ...state,
      a_input: value
    }
  )
}

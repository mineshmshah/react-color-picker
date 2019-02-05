import hexInputTypes from '../actions/types'

export default{
  [hexInputTypes.UPDATE_HEX_INPUT] : (state, {value}) => (
    {
      ...state,
      hex_input: value
    }
  )
}

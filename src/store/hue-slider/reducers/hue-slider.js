import hueSliderTypes from '../actions/types'

export default {
  [hueSliderTypes.UPDATE_POSITION]: () =>(state, {value}) => (
    {
      ...state,
      position: value
    }
  )
}

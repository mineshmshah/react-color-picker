import hueSliderTypes from '../actions/types'

export default {
  [hueSliderTypes.UPDATE_POSITION]: (state, {value, areaWidth}) => {
    const newPosition = ((value * areaWidth));
    return (
      {
        ...state,
        position: newPosition
      }
    )
  }
}

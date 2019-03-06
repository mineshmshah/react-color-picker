import hueSliderTypes from '../actions/types'

export default {
  [hueSliderTypes.UPDATE_HUE_POSITION]: (state, {value, areaWidth}) => {

    const newPosition = ((value * areaWidth) /359)| 0
    return (
      {
        ...state,
        position: newPosition
      }
    )
  }
}

import hueSliderTypes from '../actions/types'

export default {
  [hueSliderTypes.UPDATE_POSITION]: (state, {value, areaWidth}) => {

    const newPosition = ((value * areaWidth) /360)| 0

    return (
      {
        ...state,
        position: newPosition
      }
    )
  }
}

import hueSliderVerticalTypes from '../actions/types'

export default {
  [hueSliderVerticalTypes.UPDATE_HUE_POSITION_VERTICAL]: (state, {value, areaHeight}) => {

    const newPosition = ((value * areaHeight) /359)| 0
    return (
      {
        ...state,
        position: newPosition
      }
    )
  }
}

import hueSliderVerticalTypes from '../actions/types'

export default {
  [hueSliderVerticalTypes.UPDATE_HUE_POSITION_VERTICAL_HOOKS]: (state, {value, areaHeight}) => {

    const newPosition = ((value * areaHeight) /360)| 0
    return (
      {
        ...state,
        position: newPosition
      }
    )
  }
}

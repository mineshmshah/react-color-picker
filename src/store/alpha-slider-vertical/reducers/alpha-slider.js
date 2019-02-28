import hueSliderVerticalTypes from '../actions/types'

export default {
  [hueSliderVerticalTypes.UPDATE_ALPHA_POSITION_VERTICAL]: (state, {value, areaHeight}) => {
    const newPosition = areaHeight - ((value * areaHeight));
    return (
      {
        ...state,
        position: newPosition
      }
    )
  }
}

import pickerAreaTypes from '../actions/types'

export default {
  [pickerAreaTypes.UPDATE_COLOR_PICKER_AREA_POSITION]: (state, {sv,v,sl,l, areaWidth, areaHeight, format}) => {
    const pickerOffset = 6;
    let x= 0;
    let y=0;

    if (format === 'HSL') {
      x = (sl * areaWidth)/100 - pickerOffset
      y = areaHeight -((l * areaHeight)/100) - pickerOffset
    }
    if (format === 'HSV') {
      x = (sv * areaWidth)/100 - pickerOffset
      y = areaHeight -((v * areaHeight)/100) - pickerOffset
    }

    return (
      {
        ...state,
        positionX: x,
        positionY: y
      }
    )
  }
}

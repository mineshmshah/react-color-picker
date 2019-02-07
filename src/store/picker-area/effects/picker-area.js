// import { takeEvery, put, select } from 'redux-saga/effects'
// import pickerAreaTypes from '../actions/types'
// import colorTypes from '../../color/actions/types'
// import { HSLtoRGB } from '../../../utils/HSLtoRGB'
// import { RGBtoHex } from '../../../utils/RGBtoHEX';
//
// function * updateColorsWithPickerArea ({value}) {
//
//   // yield put({
//   //   type: colorTypes.UPDATE_H,
//   //   value
//   // });
//   //
//   // const currentColors = yield select(state => state.color);
//   // const { h , sl , l } = currentColors;
//   //
//   // const newRGB = HSLtoRGB(h,sl,l);
//   // yield put({
//   //   type:colorTypes.UPDATE_RGB_COMBO,
//   //   ...newRGB
//   // });
//   //
//   // const updatedColors = yield select(state => state.color);
//   //
//   // const { r , g , b } = updatedColors;
//   // const newHex = RGBtoHex(r,g,b);
//   // yield put({
//   //   type:colorTypes.UPDATE_HEX,
//   //   value: newHex
//   // })
// }
//
// export default [
//   takeEvery(pickerAreaTypes.UPDATE_COLORS_WITH_PICKER_AREA, updateColorsWithPickerArea)
// ]

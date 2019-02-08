import { takeEvery, put, select } from 'redux-saga/effects'
import pickerAreaTypes from '../actions/types'
import colorTypes from '../../color/actions/types'
import { HSLtoRGB } from '../../../utils/HSLtoRGB'
import { HSVtoRGB } from '../../../utils/HSVtoRGB'
import { RGBtoHex } from '../../../utils/RGBtoHEX'
import { RGBtoHSL } from '../../../utils/RGBtoHSL'
import { RGBtoHSV } from '../../../utils/RGBtoHSV'


function * updateColorsWithPickerArea ({xValue, yValue, format}) {

  const currentHue =   yield select(state => state.color.h);

  if (format === 'HSL') {
    yield put({
      type: colorTypes.UPDATE_HSL_COMBO,
      FinalHue: currentHue,
      FinalSaturation: xValue,
      FinalLightness: yValue
    });

    const currentColors = yield select(state => state.color);
    const { h , sl , l } = currentColors;
    const newRGB = HSLtoRGB(h,sl,l);
    yield put({
      type:colorTypes.UPDATE_RGB_COMBO,
      ...newRGB
    });

    // const updatedColors = yield select(state => state.color);
    //
    // const { r , g , b } = updatedColors;
    //
    // const newHex = RGBtoHex(r,g,b);
    // const newHSV = RGBtoHSV(r,g,b);
    //
    // yield put({
    //   type:colorTypes.UPDATE_HEX,
    //   value: newHex
    // })
    // yield put({
    //   type:colorTypes.UPDATE_HSV_COMBO,
    //   ...newHSV
    // })
  }
  if (format === 'HSV') {
    yield put({
      type: colorTypes.UPDATE_HSV_COMBO,
      FinalHue: currentHue,
      FinalSaturation: xValue,
      FinalValue: yValue
    })

    const currentColors = yield select(state => state.color);
    const { h , sv , v } = currentColors;

    const newRGB = HSVtoRGB(h,sv,v);
    yield put({
      type:colorTypes.UPDATE_RGB_COMBO,
      ...newRGB
    });

    const updatedColors = yield select(state => state.color);

    const { r , g , b } = updatedColors;

    const newHex = RGBtoHex(r,g,b);
    const newHSL = RGBtoHSL(r,g,b);
    yield put({
      type:colorTypes.UPDATE_HEX,
      value: newHex
    })
    yield put({
      type:colorTypes.UPDATE_HSL_COMBO,
      ...newHSL
    })
  }
}

export default [
  takeEvery(pickerAreaTypes.UPDATE_COLORS_WITH_PICKER_AREA, updateColorsWithPickerArea)
]

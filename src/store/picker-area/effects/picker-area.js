import { takeEvery, put, select } from 'redux-saga/effects'
import pickerAreaTypes from '../actions/types'
import colorTypes from '../../color/actions/types'
import { HSLtoRGB } from '../../../utils/HSLtoRGB'
import { HSVtoRGB } from '../../../utils/HSVtoRGB'
import { RGBtoHex } from '../../../utils/RGBtoHEX'
import { RGBtoHSL } from '../../../utils/RGBtoHSL'
import { RGBtoHSV } from '../../../utils/RGBtoHSV'
import { HSLtoHSV } from "../../../utils/HSLtoHSV";
import { HSVtoHSL } from "../../../utils/HSVtoHSL";


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
    const newHSV = HSLtoHSV(h,sl,l);
    const newRGB = HSLtoRGB(h,sl,l);
    yield put({
      type: colorTypes.UPDATE_HSV_COMBO,
      ...newHSV
    });
    yield put({
      type:colorTypes.UPDATE_RGB_COMBO,
      ...newRGB
    });

    const updatedColors = yield select(state => state.color);

    const { r , g , b } = updatedColors;

    const newHex = RGBtoHex(r,g,b);

    yield put({
      type:colorTypes.UPDATE_HEX,
      value: newHex
    })

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

    const newHSL = HSVtoHSL(h,sv,v);
    const newRGB = HSVtoRGB(h,sv,v);
    yield put({
      type:colorTypes.UPDATE_HSL_COMBO,
      ...newHSL
    });
    yield put({
      type:colorTypes.UPDATE_RGB_COMBO,
      ...newRGB
    });

    const updatedColors = yield select(state => state.color);

    const { r , g , b } = updatedColors;

    const newHex = RGBtoHex(r,g,b);
    yield put({
      type:colorTypes.UPDATE_HEX,
      value: newHex
    })
  }
}

export default [
  takeEvery(pickerAreaTypes.UPDATE_COLORS_WITH_PICKER_AREA, updateColorsWithPickerArea)
]

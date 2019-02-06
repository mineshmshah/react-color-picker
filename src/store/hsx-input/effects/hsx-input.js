import { takeEvery, put, select } from 'redux-saga/effects'
import hsxInputTypes from '../actions/types'
import colorTypes from '../../color/actions/types'
import { HSLtoRGB } from '../../../utils/HSLtoRGB'
import { HSVtoRGB } from '../../../utils/HSVtoRGB'
import { RGBtoHSV } from '../../../utils/RGBtoHSV'
import { RGBtoHSL } from '../../../utils/RGBtoHSL'
import { RGBtoHex } from '../../../utils/RGBtoHEX';


function * validateHSXInput ({value, min, max, format}) {
  const currentInput = yield select(state => state.hsxInput[`${value}_input`])

  const currentValue = yield select(state => state.color[value])


  const parsedInput = Number.parseInt(currentInput,10);
  const parsedValue = Number.parseInt(currentValue,10);

  const validityCheck = typeof(parsedInput) === 'number' && !Number.isNaN(+currentInput)
    && parsedInput >= min && parsedInput <= max;
  if (validityCheck) {
    yield put({
      type: colorTypes[[`UPDATE_${value.toUpperCase()}`]],
      value: parsedInput
    });
    if (format==='HSL') {
      let currentColors = yield select(state => state.color);
      const { h , sl , l } = currentColors;

      const newRGB = HSLtoRGB(h,sl,l);
      yield put({
        type:colorTypes.UPDATE_RGB_COMBO,
        ...newRGB
      });
      currentColors = yield select(state => state.color);
      const { r , g , b } = currentColors;
      const newHSV = RGBtoHSV(r,g,b);
      const newHex = RGBtoHex(r,g,b);

      yield put({
        type:colorTypes.UPDATE_HSV_COMBO,
        ...newHSV
      });
      yield put({
        type:colorTypes.UPDATE_HEX,
        value: newHex
      })
    }
    if (format==='HSV') {
      let currentColors = yield select(state => state.color);
      const { h , sv , v } = currentColors;
      const newRGB = HSVtoRGB(h,sv,v);

      yield put({
        type:colorTypes.UPDATE_RGB_COMBO,
        ...newRGB
      });
      currentColors = yield select(state => state.color);
      const { r , g , b } = currentColors;
      const newHSL = RGBtoHSL(r,g,b);
      const newHex = RGBtoHex(r,g,b);

      yield put({
        type:colorTypes.UPDATE_HSL_COMBO,
        ...newHSL
      });
      yield put({
        type:colorTypes.UPDATE_HEX,
        value: newHex
      })
    }
  } else {
    yield put({
      type: hsxInputTypes[`UPDATE_${value.toUpperCase()}_INPUT`],
      value: parsedValue
    })
  }
}

export default [
  takeEvery(hsxInputTypes.VALIDATE_HSX_INPUT, validateHSXInput)
]

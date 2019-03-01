import { takeEvery, put, select } from 'redux-saga/effects'
import alphaSliderTypes from '../actions/types'
import colorTypes from '../../color/actions/types'

function * validateAlphaValueWithSlider ({value}) {
  let hexValue = yield select(state => state.color.hex);
  const newAlphaHex = Math.round(value * 255).toString(16).toUpperCase();

  if(value === '1.00') {
    hexValue = hexValue.slice(0,7)
  } else {
    hexValue = hexValue.slice(0,7).concat(newAlphaHex)
  }

  yield put({
    type:colorTypes.UPDATE_HEX,
    value: hexValue
  });

  yield put({
    type: colorTypes.UPDATE_A,
    value
  });
}

export default [
  takeEvery(alphaSliderTypes.VALIDATE_ALPHA_VALUE_WITH_SLIDER, validateAlphaValueWithSlider)
]

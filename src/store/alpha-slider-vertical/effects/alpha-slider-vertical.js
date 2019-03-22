import { takeEvery, put, select } from 'redux-saga/effects'
import alphaSliderVerticalTypes from '../actions/types'
import colorTypes from '../../color/actions/types'
import { transformHexForAlpha } from '../../../utils/transformHEXforAlpha'

function * validateAlphaValueVerticalSlider ({value}) {
  let hexValue = yield select(state => state.color.hex);
  hexValue = transformHexForAlpha(hexValue, value);

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
  takeEvery(alphaSliderVerticalTypes.VALIDATE_ALPHA_VALUE_VERTICAL_SLIDER, validateAlphaValueVerticalSlider)
]

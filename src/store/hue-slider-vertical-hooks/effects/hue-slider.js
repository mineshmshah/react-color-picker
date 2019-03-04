import { takeEvery, put, select } from 'redux-saga/effects'
import hueSliderVerticalTypes from '../actions/types'
import colorTypes from '../../color/actions/types'
import { HSLtoRGB } from '../../../utils/HSLtoRGB'
import { RGBtoHex } from '../../../utils/RGBtoHEX';

function * updateColorsWithHueSliderVerticalHooks ({value}) {
  yield put({
    type: colorTypes.UPDATE_H,
    value
  });

  const currentColors = yield select(state => state.color);
  const { h , sl , l } = currentColors;

  const newRGB = HSLtoRGB(h,sl,l);
  yield put({
    type:colorTypes.UPDATE_RGB_COMBO,
    ...newRGB
  });

  const updatedColors = yield select(state => state.color);

  const { r , g , b, hex } = updatedColors;
  const hexAlpha = hex.slice(7,9);
  const newHex = RGBtoHex(r,g,b, hexAlpha);
  yield put({
    type:colorTypes.UPDATE_HEX,
    value: newHex
  })
}

export default [
  takeEvery(hueSliderVerticalTypes.UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL_HOOKS, updateColorsWithHueSliderVerticalHooks)
]

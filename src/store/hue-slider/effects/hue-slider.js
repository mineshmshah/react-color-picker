import { takeEvery, put, select } from 'redux-saga/effects'
import hueSliderTypes from '../actions/types'
import colorTypes from '../../color/actions/types'
import { HSLtoRGB } from '../../../utils/HSLtoRGB'

function * updateColorsWithHueSlider ({value}) {

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
}

export default [
  takeEvery(hueSliderTypes.UPDATE_COLORS_WITH_HUE_SLIDER, updateColorsWithHueSlider)
]

import {takeEvery, put, select} from 'redux-saga/effects'
import rgbInputTypes from '../actions/types'
import colorTypes from '../../color/actions/types'
import {RGBtoHSL} from '../../../utils/RGBtoHSL'

function * validateRGBInput ({value, min, max}) {

  const currentInput = yield select(state => state.rgbInput[`${value}_input`])

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

    const currentColors = yield select(state => state.color);
    const { r , g , b } = currentColors
    const newHSL = RGBtoHSL(r,g,b)

    yield put({
      type:colorTypes.UPDATE_HSL_COMBO,
      ...newHSL
    });

  } else {
    yield put({
      type: rgbInputTypes[`UPDATE_${value.toUpperCase()}_INPUT`],
      value: parsedValue
    })
  }
}

export default [
  takeEvery(rgbInputTypes.VALIDATE_RGB_INPUT, validateRGBInput)
]

import {takeEvery, put, select} from 'redux-saga/effects'
import hexInputTypes from '../actions/types'
import colorTypes from '../../color/actions/types'

function * validateHexInput () {

  let inputValue = yield select(state => state.hexInput.hex_input)
  const colorHexValue = yield select(state => state.color.hex)

  const valid  = /(^#{0,1}[0-9A-F]{6}$)|(^#{0,1}[0-9A-F]{3}$)/i.test(inputValue);


  if (valid) {
    if (inputValue[0] === '#')
      inputValue = inputValue.slice(1, inputValue.length);

    if (inputValue.length === 3)
      inputValue = inputValue.replace(/([0-9A-F])([0-9A-F])([0-9A-F])/i,'$1$1$2$2$3$3');

    yield put({
      type: colorTypes.UPDATE_HEX,
      value: `#${inputValue}`
    });

  } else {
    yield put({
      type: hexInputTypes.UPDATE_HEX_INPUT,
      value: colorHexValue
    })
  }
}

export default [
  takeEvery(hexInputTypes.VALIDATE_HEX_INPUT, validateHexInput)
]

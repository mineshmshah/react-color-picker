import {takeEvery, put, select} from 'redux-saga/effects'
import aInputTypes from '../actions/types'
import colorTypes from '../../color/actions/types'

function * validateAInput () {

  const currentInput = yield select(state => state.aInput.a_input)

  const currentValue = yield select(state => state.color.a)


  const parsedInput = Number.parseFloat(currentInput);
  const parsedValue = Number.parseFloat(currentValue);

  const validityCheck = typeof(parsedInput) === 'number' && !Number.isNaN(+currentInput)
    && parsedInput >= 0 && parsedInput <= 1;

  debugger;
  if (validityCheck) {
    yield put({
      type: colorTypes.UPDATE_A,
      value: parsedInput.toFixed(2)
    });
  } else {
    yield put({
      type: aInputTypes.UPDATE_A_INPUT,
      value: parsedValue.toFixed(2)
    })
  }
}

export default [
  takeEvery(aInputTypes.VALIDATE_A_INPUT, validateAInput)
]

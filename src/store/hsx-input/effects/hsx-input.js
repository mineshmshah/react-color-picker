import {takeEvery, put, select} from 'redux-saga/effects'
import hsxInputTypes from '../actions/types'
import colorTypes from '../../color/actions/types'

function * validateHSXInput ({value, min, max}) {

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

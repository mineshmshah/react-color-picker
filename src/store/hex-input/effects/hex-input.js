import {takeEvery, put, select} from 'redux-saga/effects'
import hexInputTypes from '../actions/types'
import colorTypes from '../../color/actions/types'
import { RGBtoHSV } from "../../../utils/RGBtoHSV";
import { RGBtoHSL } from "../../../utils/RGBtoHSL";

function * validateHexInput () {

  let inputValue = yield select(state => state.hexInput.hex_input);
  const colorHexValue = yield select(state => state.color.hex);

  const valid  = /(^#{0,1}[0-9A-F]{6}$)|(^#{0,1}[0-9A-F]{3}$)|(^#{0,1}[0-9A-F]{8}$)|(^#{0,1}[0-9A-F]{4}$)/i.test(inputValue);


  if (valid) {
    let  storeValue = inputValue;
    if (storeValue[0] !== '#')
      storeValue = `#${storeValue}`;

    if (inputValue[0] === '#')
      inputValue = inputValue.slice(1, inputValue.length);

    if (inputValue.length === 3)
      inputValue = inputValue.replace(/([0-9A-F])([0-9A-F])([0-9A-F])/i,'$1$1$2$2$3$3');

    if (inputValue.length === 4)
      inputValue = inputValue.replace(/([0-9A-F])([0-9A-F])([0-9A-F])([0-9A-F])/i,'$1$1$2$2$3$3$4$4');

    const FinalRed = Number.parseInt(inputValue.substr(0, 2), 16);
    const FinalGreen = Number.parseInt(inputValue.substr(2, 2), 16);
    const FinalBlue = Number.parseInt(inputValue.substr(4, 2), 16);

    const hexValue = inputValue.length === 8
      ? Number.parseInt(inputValue.substr(6, 2), 16)
      :'255';
    const newAlpha = (hexValue / 255).toFixed(2);

    const newRGB = { FinalRed, FinalGreen, FinalBlue };
    const newHSL = RGBtoHSL(FinalRed, FinalGreen, FinalBlue);
    const newHSV = RGBtoHSV(FinalRed, FinalGreen, FinalBlue);
    yield put({
      type: colorTypes.UPDATE_HEX,
      value: storeValue
    });
    yield put({
      type: colorTypes.UPDATE_A,
      value: newAlpha
    });
    yield put({
      type:colorTypes.UPDATE_RGB_COMBO,
      ...newRGB
    });
    yield put({
      type:colorTypes.UPDATE_HSL_COMBO,
      ...newHSL
    });
    yield put({
      type:colorTypes.UPDATE_HSV_COMBO,
      ...newHSV
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

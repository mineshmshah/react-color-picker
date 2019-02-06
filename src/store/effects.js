import { all } from 'redux-saga/effects'

import rgbInputEffects from './rgb-input/effects'
import hsxInputEffects from './hsx-input/effects'
import aInputEffects from './a-input/effects'
import hexEffects from './hex-input/effects'
import hueSliderEffects from './hue-slider/effects'

export default function * (){
  yield all([
    ...rgbInputEffects,
    ...hsxInputEffects,
    ...aInputEffects,
    ...hexEffects,
    ...hueSliderEffects
  ])
}

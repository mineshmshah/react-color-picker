import { all } from 'redux-saga/effects'

import rgbInputEffects from './rgb-input/effects'
import hsxInputEffects from './hsx-input/effects'
import aInputEffects from './a-input/effects'
import hexEffects from './hex-input/effects'
import hueSliderEffects from './hue-slider/effects'
import alphaVerticalEffects from './alpha-slider-vertical/effects'
import alphaSliderEffects from './alpha-slider/effects'
import hueVerticalEffects from './hue-slider-vertical/effects'
import pickerAreaEffects from './picker-area/effects'

export default function * (){
  yield all([
    ...rgbInputEffects,
    ...hsxInputEffects,
    ...aInputEffects,
    ...hexEffects,
    ...hueSliderEffects,
    ...pickerAreaEffects,
    ...hueVerticalEffects,
    ...alphaVerticalEffects,
    ...alphaSliderEffects
  ])
}

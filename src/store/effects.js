import { all } from 'redux-saga/effects'

import rgbInputEffects from './rgb-input/effects'
import hsxInputEffects from './hsx-input/effects'
import aInputEffects from './a-input/effects'
import hexEffects from './hex-input/effects'

export default function * (){
  yield all([
    ...rgbInputEffects,
    ...hsxInputEffects,
    ...aInputEffects,
    ...hexEffects
  ])
}

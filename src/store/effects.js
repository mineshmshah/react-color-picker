import { all } from 'redux-saga/effects'

import rgbInputEffects from './rgb-input/effects'

export default function * (){
  yield all([
    ...rgbInputEffects
  ])
}

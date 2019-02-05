import { combineReducers } from 'redux';
import colorReducer from './color/reducers'
import hueSliderReducer from './hue-slider/reducers'
import rgbInputReducer from './rgb-input/reducers'
import hsxInputReducer from './hsx-input/reducers'
import aInputReducer from './a-input/reducers'
import alphaSliderReducer from './alpha-slider/reducers'
import hexInputReducer from './hex-input/reducers'

export default combineReducers({
  color: colorReducer,
  hue: hueSliderReducer,
  alpha: alphaSliderReducer,
  rgbInput: rgbInputReducer,
  hsxInput: hsxInputReducer,
  aInput: aInputReducer,
  hexInput: hexInputReducer
})

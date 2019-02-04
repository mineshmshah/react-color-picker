import { combineReducers } from 'redux';
import colorReducer from './color/reducers'
import hueSliderReducer from './hue-slider/reducers'
import rgbInputReducer from './rgb-input/reducers'
import hsxInputReducer from './hsx-input/reducers'
import aInputReducer from './a-input/reducers'

export default combineReducers({
  color: colorReducer,
  hue: hueSliderReducer,
  rgbInput: rgbInputReducer,
  hsxInput: hsxInputReducer,
  aInput: aInputReducer
})

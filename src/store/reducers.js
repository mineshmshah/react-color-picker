import { combineReducers } from 'redux';
import colorReducer from './color/reducers'
import hueSliderReducer from './hue-slider/reducers'
import rgbInputReducer from './rgb-input/reducers'

export default combineReducers({
  color: colorReducer,
  hue: hueSliderReducer,
  rgbInput: rgbInputReducer
})

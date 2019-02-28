import { combineReducers } from 'redux';
import colorReducer from './color/reducers'
import hueSliderReducer from './hue-slider/reducers'
import rgbInputReducer from './rgb-input/reducers'
import hsxInputReducer from './hsx-input/reducers'
import aInputReducer from './a-input/reducers'
import alphaSliderReducer from './alpha-slider/reducers'
import hexInputReducer from './hex-input/reducers'
import pickerAreaReducer from './picker-area/reducers'
import hueSliderVerticalReducer from './hue-slider-vertical/reducers'
import alphaSliderVerticalReducer from './alpha-slider-vertical/reducers'


export default combineReducers({
  color: colorReducer,
  hue: hueSliderReducer,
  alpha: alphaSliderReducer,
  rgbInput: rgbInputReducer,
  hsxInput: hsxInputReducer,
  aInput: aInputReducer,
  hexInput: hexInputReducer,
  pickerArea: pickerAreaReducer,
  hueVertical: hueSliderVerticalReducer,
  alphaVertical:alphaSliderVerticalReducer
})

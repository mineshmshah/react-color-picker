import { combineReducers } from 'redux';
import colorReducer from './color/reducers'

export default combineReducers({
  color: colorReducer
})

import intialState from '../state'
import rgbInputReducer from './rgb-input'

const reducer ={
  ...rgbInputReducer
};

export default (state = intialState, action) => (
  reducer[action.type]
    ? reducer[action.type](state,action) : state
)

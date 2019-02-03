import intialState from '../state'
import hueSliderReducer from './hue-slider'

const reducer ={
  ...hueSliderReducer
};

export default (state = intialState, action) => (
  reducer[action.type]
    ? reducer[action.type](state,action) : state
)

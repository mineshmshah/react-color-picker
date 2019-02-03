import initialState from '../state'
import hueSliderReducer from './hue-slider'

const reducer ={
  ...hueSliderReducer
};

export default (state = initialState, action) => (
  reducer[action.type]
    ? reducer[action.type](state,action) : state
)

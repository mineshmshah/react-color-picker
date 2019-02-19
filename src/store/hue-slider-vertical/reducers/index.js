import initialState from '../state'
import hueSliderVerticalReducer from './hue-slider'

const reducer ={
  ...hueSliderVerticalReducer
};

export default (state = initialState, action) => (
  reducer[action.type]
    ? reducer[action.type](state,action) : state
)

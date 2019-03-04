import initialState from '../state'
import hueSliderVerticalHooksReducer from './hue-slider'

const reducer ={
  ...hueSliderVerticalHooksReducer
};

export default (state = initialState, action) => (
  reducer[action.type]
    ? reducer[action.type](state,action) : state
)

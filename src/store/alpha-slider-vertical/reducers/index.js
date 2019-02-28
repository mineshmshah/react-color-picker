import initialState from '../state'
import alphaSliderReducer from './alpha-slider'

const reducer ={
  ...alphaSliderReducer
};

export default (state = initialState, action) => (
  reducer[action.type]
    ? reducer[action.type](state,action) : state
)

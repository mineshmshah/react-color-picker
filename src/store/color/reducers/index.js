import intialState from '../state'
import colorReducer from './color'

const reducer ={
  ...colorReducer
};

export default (state = intialState, action) => (
  reducer[action.type]
    ? reducer[action.type](state,action) : state
)

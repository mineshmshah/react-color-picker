import intialState from '../state'
import aInputReducer from './a-input'

const reducer ={
  ...aInputReducer
};

export default (state = intialState, action) => (
  reducer[action.type]
    ? reducer[action.type](state,action) : state
)

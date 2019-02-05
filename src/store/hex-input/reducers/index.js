import intialState from '../state'
import aInputReducer from './hex-input'

const reducer ={
  ...aInputReducer
};

export default (state = intialState, action) => (
  reducer[action.type]
    ? reducer[action.type](state,action) : state
)

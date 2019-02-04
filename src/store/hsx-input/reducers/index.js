import intialState from '../state'
import hsxInputReducer from './hsx-input'

const reducer ={
  ...hsxInputReducer
};

export default (state = intialState, action) => (
  reducer[action.type]
    ? reducer[action.type](state,action) : state
)

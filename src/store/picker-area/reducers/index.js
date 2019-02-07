import initialState from '../state'
import pickerAreaReducer from './picker-area'

const reducer ={
  ...pickerAreaReducer
};

export default (state = initialState, action) => (
  reducer[action.type]
    ? reducer[action.type](state,action) : state
)

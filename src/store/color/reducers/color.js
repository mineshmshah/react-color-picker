import colorTypes from '../actions/types'

export default{
  [colorTypes.UPDATE_R] : state => {
    let currentRInput = Number.parseInt(state.r_input,10);
    let currentR = Number.parseInt(state.r,10);
    const validityCheck = typeof(currentRInput) === 'number' && Number.isNaN(Number(currentRInput)) === false
      && currentRInput >= 0 && currentRInput <= 255;
    validityCheck ? currentR = currentRInput :  currentRInput = currentR;
    return({
      ...state,
      r_input: currentRInput,
      r: currentR
    })
  },
  [colorTypes.UPDATE_R_INPUT] : (state, {value}) => (
    {
      ...state,
      r_input: value
    }
  )
}

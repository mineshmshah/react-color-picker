import colorTypes from '../actions/types'

const returnValidatedInput = (state, value, min, max) => {
  const currentInput = state[`${value}_input`];
  let parsedValue = Number.parseInt(state[`${value}`],10);
  let parsedInput = Number.parseInt(state[`${value}_input`],10);
  const validityCheck = typeof(parsedInput) === 'number' && !Number.isNaN(+currentInput)
    && parsedInput >= min && parsedInput <= max;
  validityCheck ? parsedValue = parsedInput :  parsedInput = parsedValue;
  return({
    ...state,
    [`${value}_input`]: parsedInput,
    [`${value}`]: parsedValue
  })
};

export default{
  [colorTypes.UPDATE_R] : state => {
    return returnValidatedInput(state,'r',0, 255)
  },
  [colorTypes.UPDATE_R_INPUT] : (state, {value}) => (
    {
      ...state,
      r_input: value
    }
  )
}

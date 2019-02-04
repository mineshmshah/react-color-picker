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
  [colorTypes.UPDATE_R] : (state, {value}) => (
    {
      ...state,
      r: value
    }
  ),
  [colorTypes.UPDATE_G] : (state, {value}) => (
    {
      ...state,
      g: value
    }
  ),
  [colorTypes.UPDATE_B] : (state, {value}) => (
    {
      ...state,
      b: value
    }
  ),
  [colorTypes.UPDATE_H] : (state, {value}) => (
    {
      ...state,
      h: value
    }
  ),
  [colorTypes.UPDATE_S] : (state, {value}) => (
    {
      ...state,
      s: value
    }
  ),
  [colorTypes.UPDATE_L] : (state, {value}) => (
    {
      ...state,
      l: value
    }
  ),
  [colorTypes.UPDATE_V] : (state, {value}) => (
    {
      ...state,
      v: value
    }
  ),
  [colorTypes.UPDATE_A] : state => returnValidatedInput(state,'a',0, 255),
  [colorTypes.UPDATE_A_INPUT] : (state, {value}) => (
    {
      ...state,
      a_input: value
    }
  ),
  [colorTypes.UPDATE_FORMAT] : (state, {value}) => (
    {
      ...state,
      format: value
    }
  ),
}

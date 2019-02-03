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
  [colorTypes.UPDATE_R] : state => returnValidatedInput(state,'r',0, 255),
  [colorTypes.UPDATE_R_INPUT] : (state, {value}) => (
    {
      ...state,
      r_input: value
    }
  ),
  [colorTypes.UPDATE_G] : state => returnValidatedInput(state,'g',0, 255),
  [colorTypes.UPDATE_G_INPUT] : (state, {value}) => (
    {
      ...state,
      g_input: value
    }
  ),
  [colorTypes.UPDATE_B] : state => returnValidatedInput(state,'b',0, 255),
  [colorTypes.UPDATE_B_INPUT] : (state, {value}) => (
    {
      ...state,
      b_input: value
    }
  ),
  [colorTypes.UPDATE_H] : state => returnValidatedInput(state,'h',0, 359),
  [colorTypes.UPDATE_H_INPUT] : (state, {value}) => (
    {
      ...state,
      h_input: value
    }
  ),
  [colorTypes.UPDATE_S] : state => returnValidatedInput(state,'s',0, 100),
  [colorTypes.UPDATE_S_INPUT] : (state, {value}) => (
    {
      ...state,
      s_input: value
    }
  ),
  [colorTypes.UPDATE_L] : state => returnValidatedInput(state,'l',0, 100),
  [colorTypes.UPDATE_L_INPUT] : (state, {value}) => (
    {
      ...state,
      l_input: value
    }
  ),
  [colorTypes.UPDATE_V] : state => returnValidatedInput(state,'v',0, 100),
  [colorTypes.UPDATE_V_INPUT] : (state, {value}) => (
    {
      ...state,
      v_input: value
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

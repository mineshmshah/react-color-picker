import PropTypes from 'prop-types';

export default initialState => {
  const state = initialState;

  state.PropTypes = {
    h_input: PropTypes.number,
    s_input: PropTypes.number,
    l_input: PropTypes.number,
    v_input: PropTypes.number,
  };

  return state;
};

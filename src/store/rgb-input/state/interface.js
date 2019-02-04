import PropTypes from 'prop-types';

export default initialState => {
  const state = initialState;

  state.PropTypes = {
    r_input: PropTypes.number,
    g_input: PropTypes.number,
    b_input: PropTypes.number,
  };

  return state;
};

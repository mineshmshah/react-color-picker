import PropTypes from 'prop-types';

export default initialState => {
  const state = initialState;

  state.PropTypes = {
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
    a: PropTypes.number,
    h: PropTypes.number,
    s: PropTypes.number,
    v: PropTypes.number,
    l: PropTypes.number,
    hex: PropTypes.string,
    format: PropTypes.string,
    a_input: PropTypes.number,
    h_input: PropTypes.number,
    s_input: PropTypes.number,
    v_input: PropTypes.number,
    l_input: PropTypes.number,
    hex_input: PropTypes.string,
  };

  return state;
};

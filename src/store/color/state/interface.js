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
    hex_input: PropTypes.string,
  };

  return state;
};

import PropTypes from 'prop-types';

export default initialState => {
  const state = initialState;

  state.PropTypes = {
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
    a: PropTypes.string,
    h: PropTypes.number,
    sv: PropTypes.number,
    sl: PropTypes.number,
    v: PropTypes.number,
    l: PropTypes.number,
    hex: PropTypes.string,
    format: PropTypes.string,
  };

  return state;
};

import PropTypes from 'prop-types';

export default initialState => {
  const state = initialState;

  state.PropTypes = {
    hex_input: PropTypes.string,
  };

  return state;
};

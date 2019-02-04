import PropTypes from 'prop-types';

export default initialState => {
  const state = initialState;

  state.PropTypes = {
    a_input: PropTypes.number,
  };

  return state;
};

import PropTypes from 'prop-types';

export default initialState => {
  const state = initialState;

  state.PropTypes = {
    position: PropTypes.number,
  };

  return state;
};

import PropTypes from 'prop-types';

export default initialState => {
  const state = initialState;

  state.PropTypes = {
    positionX: PropTypes.number,
    positionY: PropTypes.number
  };

  return state;
};

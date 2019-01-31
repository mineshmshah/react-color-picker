import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  updateRInputValue,
  updateRValue
} from '../../store/color/actions/creators'

function mapStateToProps(state) {
  return {
    r: state.color.r,
    rInput: state.color.r_input
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        updateRInputValue,
        updateRValue
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)

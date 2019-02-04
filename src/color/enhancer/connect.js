import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  updateRValue,
  updateGValue,
  updateBValue,
  updateHValue,
  updateSValue,
  updateLValue,
  updateVValue,
  updateAValue,
  updateFormat,

} from '../../store/color/actions/creators'

function mapStateToProps(state) {
  return {
    r: state.color.r,
    g: state.color.g,
    b: state.color.b,
    h: state.color.h,
    s: state.color.s,
    l: state.color.l,
    v: state.color.v,
    a: state.color.a,
    format: state.color.format
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        updateRValue,
        updateGValue,
        updateBValue,
        updateHValue,
        updateSValue,
        updateLValue,
        updateVValue,
        updateAValue,
        updateFormat,

      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)

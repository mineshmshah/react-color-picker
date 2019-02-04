import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  updateRInputValue,
  updateRValue,
  updateGInputValue,
  updateGValue,
  updateBInputValue,
  updateBValue,
  updateHInputValue,
  updateHValue,
  updateSInputValue,
  updateSValue,
  updateLInputValue,
  updateLValue,
  updateVInputValue,
  updateVValue,
  updateAInputValue,
  updateAValue,
  updateFormat,

} from '../../store/color/actions/creators'

function mapStateToProps(state) {
  return {
    r: state.color.r,
    g: state.color.g,
    b: state.color.b,
    h: state.color.h,
    hInput: state.color.h_input,
    s: state.color.s,
    sInput: state.color.s_input,
    l: state.color.l,
    lInput: state.color.l_input,
    v: state.color.v,
    vInput: state.color.v_input,
    a: state.color.a,
    aInput: state.color.a_input,
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
        updateHInputValue,
        updateHValue,
        updateSInputValue,
        updateSValue,
        updateLInputValue,
        updateLValue,
        updateVInputValue,
        updateVValue,
        updateAInputValue,
        updateAValue,
        updateFormat,

      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)

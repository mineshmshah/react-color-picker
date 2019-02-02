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

} from '../../store/color/actions/creators'

function mapStateToProps(state) {
  return {
    r: state.color.r,
    rInput: state.color.r_input,
    g: state.color.g,
    gInput: state.color.g_input,
    b: state.color.b,
    bInput: state.color.b_input,
    h: state.color.h,
    hInput: state.color.h_input,
    s: state.color.s,
    sInput: state.color.s_input,
    l: state.color.l,
    lInput: state.color.l_input,
    v: state.color.v,
    vInput: state.color.v_input,
    a: state.color.a,
    aInput: state.color.a_input
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
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


      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)

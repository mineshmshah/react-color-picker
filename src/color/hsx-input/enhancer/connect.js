import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {
  updateHInputValue,
  updateSVInputValue,
  updateSLInputValue,
  updateLInputValue,
  updateVInputValue,
  validateHSXInput
} from '../../../store/hsx-input/actions/creators'

function mapStateToProps (state) {
  return{
    hInput: state.hsxInput.h_input,
    svInput: state.hsxInput.sv_input,
    slInput: state.hsxInput.sl_input,
    lInput: state.hsxInput.l_input,
    vInput: state.hsxInput.v_input,
  }
}

function mapDispatchToProps (dispatch){
  return {
    hsxInputActions: bindActionCreators({
      updateHInputValue,
      updateSVInputValue,
      updateSLInputValue,
      updateLInputValue,
      updateVInputValue,
      validateHSXInput
    },
    dispatch
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)

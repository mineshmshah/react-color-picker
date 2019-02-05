import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {
  updateHexInputValue,
  validateHexInput
} from '../../../store/hex-input/actions/creators'

function mapStateToProps (state) {
  return{
    hexInput: state.hexInput.hex_input,
  }
}

function mapDispatchToProps (dispatch){
  return {
    hexInputActions: bindActionCreators({
      updateHexInputValue,
      validateHexInput
    },
    dispatch
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)

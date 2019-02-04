import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {
  updateGInputValue,
  updateRInputValue,
  updateBInputValue,
  validateRGBInput
} from '../../../store/rgb-input/actions/creators'

function mapStateToProps (state) {
  return{
    rInput: state.rgbInput.r_input,
    gInput: state.rgbInput.g_input,
    bInput: state.rgbInput.b_input,  }
}

function mapDispatchToProps (dispatch){
  return {
    rgbInputActions: bindActionCreators({
      updateGInputValue,
      updateRInputValue,
      updateBInputValue,
      validateRGBInput
    },
    dispatch
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {
  updateAInputValue,
  validateAInput
} from '../../../store/a-input/actions/creators'

function mapStateToProps (state) {
  return{
    aInput: state.aInput.a_input,
  }
}

function mapDispatchToProps (dispatch){
  return {
    aInputActions: bindActionCreators({
      updateAInputValue,
      validateAInput
    },
    dispatch
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)

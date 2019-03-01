import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {
  updateAlphaSliderPosition,
  validateAlphaValueWithSlider
} from '../../../store/alpha-slider/actions/creators'

function mapStateToProps (state) {
  return{
    position: state.alpha.position
  }
}

function mapDispatchToProps (dispatch){
  return {
    alphaSliderActions: bindActionCreators({
      updateAlphaSliderPosition,
      validateAlphaValueWithSlider
    },
    dispatch
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)

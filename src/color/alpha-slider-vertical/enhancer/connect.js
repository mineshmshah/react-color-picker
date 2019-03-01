import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {
  updateAlphaSliderPositionVertical,
  validateAlphaValueVerticalSlider
} from '../../../store/alpha-slider-vertical/actions/creators'

function mapStateToProps (state) {
  return{
    position: state.alphaVertical.position
  }
}

function mapDispatchToProps (dispatch){
  return {
    alphaSliderVerticalActions: bindActionCreators({
      updateAlphaSliderPositionVertical,
      validateAlphaValueVerticalSlider
    },
    dispatch
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)

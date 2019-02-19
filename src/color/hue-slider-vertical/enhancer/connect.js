import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {
  updateColorsWithHueSliderVertical,
  updateHueSliderPositionVertical
} from '../../../store/hue-slider-vertical/actions/creators'

function mapStateToProps (state) {
  return{
    position: state.hueVertical.position
  }
}

function mapDispatchToProps (dispatch){
  return {
    hueSliderVerticalActions: bindActionCreators({
      updateColorsWithHueSliderVertical,
      updateHueSliderPositionVertical
    },
    dispatch
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)

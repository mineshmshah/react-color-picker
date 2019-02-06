import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {
  updateHueSliderPosition,
  updateColorsWithHueSlider
} from '../../../store/hue-slider/actions/creators'

function mapStateToProps (state) {
  return{
    position: state.hue.position
  }
}

function mapDispatchToProps (dispatch){
  return {
    hueSliderActions: bindActionCreators({
      updateHueSliderPosition,
      updateColorsWithHueSlider
    },
    dispatch
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)

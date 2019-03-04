import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {
  updateColorsWithHueSliderVerticalHooks,
  updateHueSliderPositionVerticalHooks
} from '../../../store/hue-slider-vertical-hooks/actions/creators'

function mapStateToProps (state) {
  return{
    position: state.hueVerticalHooks.position
  }
}

function mapDispatchToProps (dispatch){
  return {
    hueSliderVerticalHooksActions: bindActionCreators({
      updateColorsWithHueSliderVerticalHooks,
      updateHueSliderPositionVerticalHooks
    },
    dispatch
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {
  updateHueSliderPosition
} from '../../../store/hue-slider/actions/creators'

function mapStateToProps (state) {
  return{
    huePosition: state.hue.position
  }
}

function mapDispatchToProps (dispatch){
  return {
    hueSliderActions: bindActionCreators({
      updateHueSliderPosition
    },
    dispatch
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)

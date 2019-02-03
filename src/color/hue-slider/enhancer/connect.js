import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {
  updateHueSliderPosition
} from '../../../store/hue-slider/actions/creators'

function mapStateToProps (state) {
  return{
    position: state.hue.position
  }
}

function mapDispatchToProps (dispatch){
  return {
    actions: bindActionCreators({
      updateHueSliderPosition
    },
    dispatch
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)

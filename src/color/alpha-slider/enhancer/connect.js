import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {
  updateAlphaSliderPosition
} from '../../../store/alpha-slider/actions/creators'

function mapStateToProps (state) {
  return{
    position: state.alpha.position
  }
}

function mapDispatchToProps (dispatch){
  return {
    alphaSliderActions: bindActionCreators({
      updateAlphaSliderPosition
    },
    dispatch
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)

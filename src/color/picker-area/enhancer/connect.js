import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateColorPickerAreaPosition,
  updateColorsWithPickerArea
} from '../../../store/picker-area/actions/creators'

function mapStateToProps(state) {
  return {
    positionX: state.pickerArea.positionX,
    positionY: state.pickerArea.positionY
  }
}

function mapDispatchToProps (dispatch) {
  return {
    pickerAreaActions: bindActionCreators(
      {
        updateColorPickerAreaPosition,
        updateColorsWithPickerArea
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)

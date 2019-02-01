import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    r: state.color.r,
    g: state.color.g,
    b: state.color.b,
    h: state.color.h,
    s: state.color.s,
    l: state.color.l,
    v: state.color.v,
    a: state.color.a,
    format: state.color.format
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)

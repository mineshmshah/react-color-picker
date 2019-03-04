import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from './enhancer/connect'
import { HueSliderComponent , SliderBox, PickerSlider } from "./styles";

class HueSliderVerticalHooks extends Component {

  constructor(props){
    super(props)
    this.updateHueSlider=this.updateHueSlider.bind(this);
    this.mouseDownEvent = this.mouseDownEvent.bind(this)
  }

  componentDidMount(){
    this.updateHueSlider()
  }

  componentDidUpdate(){
    this.updateHueSlider()
  }

  updateHueSlider() {
    const {hueSliderVerticalHooksActions, h, areaHeight} = this.props;
    hueSliderVerticalHooksActions.updateHueSliderPositionVerticalHooks(h,areaHeight)
  }

  updateHValueWithSlider(e, sliderAreaOffset){
    const {areaHeight, hueSliderVerticalHooksActions} = this.props;
    let yValue =e.pageY - sliderAreaOffset;
    if (yValue > areaHeight) yValue = areaHeight;
    if (yValue < 0) yValue = 0;
    const hue = Math.round((yValue/areaHeight) * 359);
    hueSliderVerticalHooksActions.updateColorsWithHueSliderVerticalHooks(hue);
  }

  mouseDownEvent(e){
    const sliderAreaOffset = e.currentTarget.offsetTop;
    this.updateHValueWithSlider(e, sliderAreaOffset);
    const HUpdaterFunction = event => this.updateHValueWithSlider(event, sliderAreaOffset);
    document.addEventListener('mousemove',  HUpdaterFunction) ;
    document.addEventListener('mouseup', () =>
      document.removeEventListener('mousemove', HUpdaterFunction))
  }

  render() {
    const {position, areaHeight} = this.props;
    return(
      <HueSliderComponent>
        <SliderBox areaHeight={areaHeight} onMouseDown={e=>this.mouseDownEvent(e)} >
          <PickerSlider sliderY={position}/>
        </SliderBox>
      </HueSliderComponent>
    )
  }
}

export default store(HueSliderVerticalHooks);


HueSliderVerticalHooks.propTypes = {
  hueSliderVerticalHooksActions: PropTypes.objectOf(PropTypes.func),
  h: PropTypes.number,
  areaHeight:PropTypes.number,
  position:PropTypes.number,
};

HueSliderVerticalHooks.defaultProps = {
  hueSliderVerticalHooksActions: {},
  h: 0,
  areaHeight:160,
  position:0,
};

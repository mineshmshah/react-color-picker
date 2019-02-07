import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from './enhancer/connect'
import { HueSliderComponent , SliderBox, PickerSlider } from "./styles";


class HueSlider extends Component {

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
    const {hueSliderActions, h, areaWidth} = this.props;
    hueSliderActions.updateHueSliderPosition(h,areaWidth)
  }

  updateHValueWithSlider(e, sliderAreaOffset){
    const {areaWidth, hueSliderActions} = this.props;
    let xValue =e.pageX - sliderAreaOffset;
    if (xValue > areaWidth) xValue = areaWidth;
    if (xValue < 0) xValue = 0;
    const hue = Math.round((xValue/areaWidth) * 359);
    hueSliderActions.updateColorsWithHueSlider(hue);
  }

  mouseDownEvent(e){
    const sliderAreaOffset = e.currentTarget.offsetLeft;
    this.updateHValueWithSlider(e, sliderAreaOffset);
    const HUpdaterFunction = event => this.updateHValueWithSlider(event, sliderAreaOffset);
    document.addEventListener('mousemove',  HUpdaterFunction) ;
    document.addEventListener('mouseup', () =>
      document.removeEventListener('mousemove', HUpdaterFunction))
  }

  render() {
    const {position, areaWidth} = this.props;
    return(
      <HueSliderComponent>
        <SliderBox areaWidth={areaWidth} onMouseDown={e=>this.mouseDownEvent(e)} >
          <PickerSlider sliderX={position}/>
        </SliderBox>
      </HueSliderComponent>
    )
  }
}

export default store(HueSlider);


HueSlider.propTypes = {
  hueSliderActions: PropTypes.objectOf(PropTypes.func),
  h: PropTypes.number,
  areaWidth:PropTypes.number,
  position:PropTypes.number,
};

HueSlider.defaultProps = {
  hueSliderActions: {},
  h: 0,
  areaWidth:198,
  position:0,
};

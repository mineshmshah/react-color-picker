import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from './enhancer/connect'
import { HueSliderComponent , SliderBox, PickerSlider } from "./styles";

class HueSliderVertical extends Component {

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
    const {hueSliderVerticalActions, h, areaHeight} = this.props;
    hueSliderVerticalActions.updateHueSliderPositionVertical(h,areaHeight)
  }

  updateHValueWithSlider(e, sliderAreaOffset){
    const {areaHeight, hueSliderVerticalActions} = this.props;
    let yValue =e.pageY - sliderAreaOffset;
    if (yValue > areaHeight) yValue = areaHeight;
    if (yValue < 0) yValue = 0;
    const hue = Math.round((yValue/areaHeight) * 359);
    hueSliderVerticalActions.updateColorsWithHueSliderVertical(hue);
  }

  mouseDownEvent(e){
    let currentElement = e.currentTarget;
    let sliderAreaOffset = 0;
    do {
      sliderAreaOffset += currentElement.offsetTop;
      currentElement = currentElement.offsetParent;
    } while (currentElement);
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

export default store(HueSliderVertical);


HueSliderVertical.propTypes = {
  hueSliderVerticalActions: PropTypes.objectOf(PropTypes.func),
  h: PropTypes.number,
  areaHeight:PropTypes.number,
  position:PropTypes.number,
};

HueSliderVertical.defaultProps = {
  hueSliderVerticalActions: {},
  h: 0,
  areaHeight:160,
  position:0,
};

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from './enhancer/connect'
import { AlphaSliderComponent , SliderBox, PickerSlider, SliderBoxAlphaLayer } from "./styles";


class HueSlider extends Component {

  constructor(props){
    super(props)
    this.updateAlphaSlider=this.updateAlphaSlider.bind(this);
    this.mouseDownEvent = this.mouseDownEvent.bind(this)
  }

  componentDidMount(){
    this.updateAlphaSlider()
  }

  componentDidUpdate(){
    this.updateAlphaSlider()
  }

  updateAlphaSlider() {
    const {alphaSliderActions, a, areaWidth} = this.props;
    alphaSliderActions.updateAlphaSliderPosition(a,areaWidth)
  }

  updateAValueWithSlider(e, sliderAreaOffset){
    const {areaWidth, actions} = this.props;
    let xValue =e.pageX - sliderAreaOffset;
    if (xValue > areaWidth) xValue = areaWidth;
    if (xValue < 0) xValue = 0;

    const alpha =xValue/areaWidth;
    console.log(alpha)
    actions.updateAValue(alpha);
  }

  mouseDownEvent(e){
    const sliderAreaOffset = e.currentTarget.offsetLeft;
    this.updateAValueWithSlider(e, sliderAreaOffset);
    const AUpdaterFunction = event => this.updateAValueWithSlider(event, sliderAreaOffset);
    document.addEventListener('mousemove',  AUpdaterFunction) ;
    document.addEventListener('mouseup', () =>
      document.removeEventListener('mousemove', AUpdaterFunction))
  }

  render() {
    const {position, areaWidth,h, s, l} = this.props;
    return(
      <AlphaSliderComponent>
        <SliderBoxAlphaLayer>
          <SliderBox hue={h} sat={s} l={l} areaWidth={areaWidth} onMouseDown={e=>this.mouseDownEvent(e)} >
            <PickerSlider sliderX={position}/>
          </SliderBox>
        </SliderBoxAlphaLayer>
      </AlphaSliderComponent>
    )
  }
}

export default store(HueSlider);


HueSlider.propTypes = {
  alphaSliderActions: PropTypes.objectOf(PropTypes.func),
  actions: PropTypes.objectOf(PropTypes.func),
  h: PropTypes.number,
  s: PropTypes.number,
  l: PropTypes.number,
  areaWidth:PropTypes.number,
  position:PropTypes.number,
};

HueSlider.defaultProps = {
  alphaSliderActions: {},
  actions: {},
  h: 0,
  s:0,
  l: 0,
  areaWidth:198,
  position:0,
};

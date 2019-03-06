import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from './enhancer/connect'
import { AlphaSliderComponent , SliderBox, PickerSlider, SliderBoxAlphaLayer } from "./styles";


class AlphaSlider extends Component {

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
    const {areaWidth, alphaSliderActions} = this.props;
    let xValue =e.pageX - sliderAreaOffset;
    if (xValue > areaWidth) xValue = areaWidth;
    if (xValue < 0) xValue = 0;

    const alpha =(xValue/areaWidth).toFixed(2);
    alphaSliderActions.validateAlphaValueWithSlider(alpha);
  }

  mouseDownEvent(e){
    const boundingBox = e.currentTarget.getBoundingClientRect();
    const sliderAreaOffset = boundingBox.left;
    this.updateAValueWithSlider(e, sliderAreaOffset);
    const AUpdaterFunction = event => this.updateAValueWithSlider(event, sliderAreaOffset);
    document.addEventListener('mousemove',  AUpdaterFunction) ;
    document.addEventListener('mouseup', () =>
      document.removeEventListener('mousemove', AUpdaterFunction))
  }

  render() {
    const {position, areaWidth,h, sl, l} = this.props;
    return(
      <AlphaSliderComponent>
        <SliderBoxAlphaLayer>
          <SliderBox hue={h} sat={sl} light={l} areaWidth={areaWidth} onMouseDown={e=>this.mouseDownEvent(e)} >
            <PickerSlider sliderX={position}/>
          </SliderBox>
        </SliderBoxAlphaLayer>
      </AlphaSliderComponent>
    )
  }
}

export default store(AlphaSlider);

AlphaSlider.propTypes = {
  alphaSliderActions: PropTypes.objectOf(PropTypes.func),
  h: PropTypes.number,
  sl: PropTypes.number,
  l: PropTypes.number,
  a: PropTypes.string,
  areaWidth:PropTypes.number,
  position:PropTypes.number,
};

AlphaSlider.defaultProps = {
  alphaSliderActions: {},
  h: 0,
  sl: 100,
  l: 50,
  a: "1.00",
  areaWidth:198,
  position:0,
};

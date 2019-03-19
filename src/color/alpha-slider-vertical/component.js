import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from './enhancer/connect'
import { AlphaSliderComponent , SliderBox, PickerSlider, SliderBoxAlphaLayer } from "./styles";


class AlphaSlider extends Component {

  constructor(props){
    super(props);
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
    const {alphaSliderVerticalActions, a, areaHeight} = this.props;
    alphaSliderVerticalActions.updateAlphaSliderPositionVertical(a,areaHeight)
  }

  updateAValueWithSlider(e, sliderAreaOffset){
    const {areaHeight, alphaSliderVerticalActions} = this.props;
    let yValue = areaHeight - (e.clientY + sliderAreaOffset);
    if (yValue > areaHeight) yValue = areaHeight;
    if (yValue < 0) yValue = 0;

    const alpha =(yValue/areaHeight).toFixed(2);
    alphaSliderVerticalActions.validateAlphaValueVerticalSlider(alpha);
  }

  mouseDownEvent(e){
    const currentElement = e.currentTarget;
    const boundingBox = currentElement.getBoundingClientRect();
    const sliderAreaOffset = currentElement.scrollTop - boundingBox.top;
    this.updateAValueWithSlider(e, sliderAreaOffset);
    const AUpdaterFunction = event => this.updateAValueWithSlider(event, sliderAreaOffset);
    document.addEventListener('mousemove',  AUpdaterFunction) ;
    document.addEventListener('mouseup', () =>
      document.removeEventListener('mousemove', AUpdaterFunction))
  }

  render() {
    const {position, areaHeight,h, sl, l} = this.props;
    return(
      <AlphaSliderComponent>
        <SliderBoxAlphaLayer>
          <SliderBox hue={h} sat={sl} light={l} areaHeight={areaHeight} onMouseDown={e=>this.mouseDownEvent(e)} >
            <PickerSlider sliderY={position}/>
          </SliderBox>
        </SliderBoxAlphaLayer>
      </AlphaSliderComponent>
    )
  }
}

export default store(AlphaSlider);

AlphaSlider.propTypes = {
  alphaSliderVerticalActions: PropTypes.objectOf(PropTypes.func),
  h: PropTypes.number,
  sl: PropTypes.number,
  l: PropTypes.number,
  a: PropTypes.string,
  areaHeight: PropTypes.number,
  position:PropTypes.number,
};

AlphaSlider.defaultProps = {
  alphaSliderVerticalActions: {},
  h: 0,
  sl: 100,
  l: 50,
  a: "1.00",
  areaHeight:200,
  position:0,
};

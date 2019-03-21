import React, { Component }  from 'react';
import PropTypes from 'prop-types'
import PickerArea from './picker-area'
import RGBInput from './rgb-Input'
import AInput from './a-Input'
import HueSliderVertical from './hue-slider-vertical'
import AlphaSliderVertical from './alpha-slider-vertical'
import store from './enhancer/connect'
import HexInput from './hex-Input'

import {
  Container,
  AreaAndSliderContainer,
  RGBAHexInputContainer
} from './styles';

class Color extends  Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateColor = this.updateColor.bind(this);
  }

  componentDidMount(){
    this.handleChange();
    this.updateColor()
  }

  componentDidUpdate(previousProps) {
    if(previousProps.color !== this.props.color){
      this.updateColor()
    }
    const colorHasChanged = ['r', 'g', 'b', 'a', 'h', 'sl', 'sv', 'l', 'v','hex']
      .some(key =>
        previousProps[key] !== this.props[key]
      );

    if (colorHasChanged) this.handleChange()
  }

  handleChange(){
    const {r, g, b, a, h, sl, sv, l, v, hex, onChange} = this.props;
    const colorObject = {
      hex,
      rgba: {
        r,
        g,
        b,
        a
      },
      hsla: {
        h,
        s: sl,
        l,
        a
      },
      hsva: {
        h,
        s: sv,
        v,
        a
      }
    };
    onChange(colorObject)
  }

  updateColor() {
    const { color } = this.props;
    const { updateHexInputValue, validateHexInput } = this.props.hexActions;
    updateHexInputValue(color);
    validateHexInput()
  }

  render(){
    const { r, g, b, a, h, sl, sv, l, v, hex, actions, format } = this.props;
    return (
      <Container>
        <AreaAndSliderContainer>
          <PickerArea
            {...{h}}
            {...{sl}}
            {...{sv}}
            {...{l}}
            {...{v}}
            {...{format}}
            {...{actions}}
            areaWidth={200}
            areaHeight={200}
          />
          <HueSliderVertical
            {...{h}}
            areaHeight={200}
          />
          <AlphaSliderVertical
            {...{h}}
            {...{sl}}
            {...{l}}
            {...{a}}
            areaHeight={200}
          />
        </AreaAndSliderContainer>
        <RGBAHexInputContainer>
          <HexInput
            {...{hex}}
            {...{actions}}
          />
          <RGBInput
            {...{r}}
            {...{g}}
            {...{b}}
            {...{actions}}
          />
          <AInput
            {...{a}}
            {...{actions}}
          />
        </RGBAHexInputContainer>
      </Container>
    )
  }
}
export default store(Color)

Color.propTypes ={
  r: PropTypes.number,
  g: PropTypes.number,
  b: PropTypes.number,
  h: PropTypes.number,
  sv: PropTypes.number,
  sl: PropTypes.number,
  l: PropTypes.number,
  v: PropTypes.number,
  a: PropTypes.string,
  hex: PropTypes.string,
  hexActions: PropTypes.objectOf(PropTypes.func),
  actions: PropTypes.objectOf(PropTypes.func),
  format: PropTypes.string,
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

Color.defaultProps ={
  r: 255,
  g: 0,
  b: 0,
  h: 0,
  sv: 100,
  sl:100,
  l: 50,
  v: 100,
  a: "1.00",
  hex: "#FF0000",
  hexActions: {},
  actions: {},
  format: 'HSV'
};
